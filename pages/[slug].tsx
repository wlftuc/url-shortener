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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
            setPagePass((e.target as HTMLInputElement).value)
          }
        />
        <button type="submit">Submit</button>
      </form>

      {isValidPass == false && <div>Wrong password.</div>}
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
