import React, { useEffect, useRef, useState } from "react";

// Next.js
import { useRouter } from "next/router";
import Link from "next/link";

// Chakra
import { Button, useColorMode } from "@chakra-ui/react";

// Toasts
import { ToastUX } from "../lib/toasts";
import { Toaster } from "react-hot-toast";

// Components
import DrawerLinks from "../components/Drawer";
import SEO from "../components/Seo";

// Types
import { ShortenedURL, ButtonProps } from "../lib/types";

export default function Index() {
  //states
  const [url, setUrl] = useState("");
  const [shortMeta, setShortMeta] = useState<ShortenedURL>({
    slug: "",
    origin: "web",
  });
  const [needPassword, setNeedPassword] = useState(false);
  const [URLPassword, setURLPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [host, setHost] = useState("");

  // router
  const router = useRouter();

  //ux
  const toasts = new ToastUX();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setHost(window.location.host);
  }, [router.pathname, URLPassword, url]);

  const shortenURLTransition = async () => {
    const res = await fetch(
      `/api/shorten?password=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          url,
          origin: "WEB",
          password: needPassword ? URLPassword.trim() : null,
          locked: needPassword,
        }),
      }
    );
    const data: ShortenedURL = await res.json();

    return data;
  };

  function appendToLocalStorage(object: any) {
    const allEntries = JSON.parse(localStorage.getItem("links") || "[]");
    allEntries.push(object);
    localStorage.setItem("links", JSON.stringify(allEntries));
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    let shortenedUrl: ShortenedURL;

    try {
      shortenedUrl = await shortenURLTransition();
    } catch (err) {
      return toasts.isError("An error occurred while shortening this link.");
    } finally {
      setLoading(false);
    }

    appendToLocalStorage({
      link: host + "/" + shortenedUrl.slug,
      password: needPassword ? URLPassword.trim() : "",
      slug: shortenedUrl.slug,
    });

    if (!shortenedUrl.error && !shortenedUrl.isExisting) {
      toasts.isSuccess();
    }

    if (shortenedUrl.error) {
      toasts.isError(shortenedUrl.errResp);
    }

    if (shortenedUrl.isExisting) {
      toasts.isExisting();
    }

    setShortMeta(shortenedUrl);
  };

  return (
    <section className=" h-screen">
      <SEO
        ogImageUrl={
          "https://pbs.twimg.com/media/FWMHjz4aQAAizZV?format=jpg&name=medium"
        }
        title={"shortU"}
        description="an intuitive url shortener with some neat features"
      />
      <div className="max-w-2xl  mx-auto flex items-center justify-center h-screen">
        <div className="relative">
          <label className=" text-5xl font-semibold" htmlFor="email">
            shortU
          </label>
          <div className="relative">
            <form className="mt-4" onSubmit={handleSubmit}>
              <label className="font-bold">Your URL</label>
              <input
                required
                name="URL"
                className="w-full  p-3 mt-1 text-sm border rounded-md"
                id="url"
                type="url"
                value={url}
                onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
                  setUrl((e.target as HTMLInputElement).value)
                }
              />{" "}
              <div className="mt-3">
                <label className="hover:cursor-pointer">
                  <input
                    name="Make URL password protected?"
                    type="checkbox"
                    onChange={() => setNeedPassword(!needPassword)}
                  />{" "}
                  Make URL password-locked?
                </label>
              </div>
              <div className="mt-2">
                <label className="font-bold ">Your URL password</label>
                <div>
                  <input
                    name="Password"
                    required={needPassword}
                    disabled={!needPassword}
                    className={`w-full ${
                      needPassword
                        ? "hover:cursor-text"
                        : "hover:cursor-not-allowed"
                    }  p-3 mt-1 text-sm border rounded-md`}
                    id="password"
                    type="text"
                    value={URLPassword}
                    onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
                      setURLPassword((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
              </div>
              {/* https://bobbyhadz.com/blog/typescript-property-value-not-exist-type-eventtarget */}
              <div className="text-center">
                <Button
                  type="submit"
                  isLoading={loading}
                  loadingText="Working..."
                  className=" px-2 py-1 mt-5 rounded-md"
                  onClick={() => {}}
                >
                  Shorten
                </Button>
              </div>
            </form>
            <div className="border px-2 font-semibold py-2 mt-5 rounded-md">
              Shortened URL:{" "}
              <Link target={"_blank"} href={`/${shortMeta.slug}`}>
                <a target={"_blank"} className="underline mx-2 font-bold">
                  {host}/{shortMeta.slug || shortMeta.error}
                </a>
              </Link>
            </div>
            <div className="mt-2 text-center space-x-2 flex">
              <DrawerLinks size={"sm"} label="Visit all your generated links">
                All your links can be found here!
              </DrawerLinks>
              <BorderButton onClick={toggleColorMode}>
                Switch color mode
              </BorderButton>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </section>
  );
}

function BorderButton(props: ButtonProps) {
  return (
    <button
      {...props}
      className="font-semibold border rounded-md p-2 max-w-2xl text-center text-sm"
    >
      {props.children}
    </button>
  );
}
