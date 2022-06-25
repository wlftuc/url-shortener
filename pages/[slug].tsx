import React, { useState } from "react";

import { prisma } from "../lib/prisma";
import { Hash } from "../lib/secure/secure";

import { useRouter } from "next/router";

export default function Slug({ password, url }) {
  const [pagePass, setPagePass] = useState("");
  const [isValidPass, setIsValidPass] = useState<null | boolean>(null);
  const router = useRouter();

  const passHash = new Hash(process.env.NEXT_PUBLIC_PASSWORD_HASH_TOKEN);
  const urlHash = new Hash(process.env.NEXT_PUBLIC_HASH_TOKEN);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (passHash.hashPassword(pagePass) == password) {
      router.push(urlHash.decrypt(url));
    } else {
      setIsValidPass(false);
    }
  };

  return (
    <div>
      {/* <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
            setPagePass((e.target as HTMLInputElement).value)
          }
        />
        <button type="submit">Submit</button>
      </form> */}

      <div>
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
          <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-2xl font-bold sm:text-3xl">
                This URL is protected!
              </h1>
              <p className="mt-4 text-gray-500 text-left">
                To continue, please enter the password which was entered when
                you first shortened the URL. Without a password, we cannot
                authorize you to the original link.
              </p>
            </div>
            <form
              onSubmit={onSubmit}
              className="max-w-md mx-auto mt-8 mb-0 space-y-4"
            >
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                  onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
                    setPagePass((e.target as HTMLInputElement).value)
                  }
                    type="text"
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Enter password"
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                 
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="inline-block px-5 py-3  text-sm font-medium text-white bg-green-500 rounded-lg"
                >
                  Go!
                </button>
              </div>
              {isValidPass == false && (
                <div className="max-w-2xl text-center bg-red-500 text-white font-bold border p-2 rounded-md">
                  <p>Wrong password!</p>
                </div>
              )}
            </form>
          </div>
          <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
            <img
              className="absolute inset-0 object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1606750408405-295e25216edd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 *
 * @TODO - Add some level of string matching.
 * If a slug/url does not exist, return the slug/url which closely matches to the original input
 *
 * Quite redundant, but could teach you a lot of stuff.
 */

export const getServerSideProps = async (context: {
  params: { slug: string };
}) => {
  const currentSlug: string = context.params.slug;

  const hash = new Hash(process.env.HASH_TOKEN);

  const redirectTo = await prisma.shortener.findUnique({
    where: {
      slug: currentSlug,
    },
  });

  if (!redirectTo) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  if (redirectTo.locked) {
    return {
      props: {
        password: redirectTo.password,
        url: redirectTo.redirectTo,
      },
    };
  }

  return {
    redirect: {
      destination: hash.decrypt(redirectTo.redirectTo),
    },
  };
};
