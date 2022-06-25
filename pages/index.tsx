import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { ToastUX } from "../lib/toasts";
import { Toaster } from "react-hot-toast";
import FAQ from "../components/FAQ";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

type ShortenedURL = {
  slug: string;
  origin: "web" | "bot";
  error?: boolean;
  isExisting?: boolean;
  link?: string;
  errResp?: string;
};

export default function Index({ html }) {
  const [url, setUrl] = useState("");
  const [shortMeta, setShortMeta] = useState<ShortenedURL>({
    slug: "",
    origin: "web",
  });
  const [needPassword, setNeedPassword] = useState(false);
  const [URLPassword, setURLPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [host, setHost] = useState("");
  const router = useRouter();
  const toasts = new ToastUX();

  useEffect(() => {
    setHost(window.location.host);
  }, [router.pathname]);

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
          password: needPassword ? URLPassword : null,
        }),
      }
    );
    const data: ShortenedURL = await res.json();

    return data;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const shortenedUrl = await shortenURLTransition();
    setLoading(false);

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
    <section className="bg-gray-100 p-5 h-screen">
      <div className="max-w-2xl  mx-auto flex items-center justify-center h-screen">
        <div className="relative">
          <label className=" text-5xl font-semibold" htmlFor="email">
            URL shortener
          </label>
          <div className="relative">
            <form className="mt-4" onSubmit={handleSubmit}>
              <label className="font-bold text-[#442E26]">Your URL</label>
              <input
                required
                className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded-md"
                id="url"
                type="url"
                value={url}
                onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                  setUrl((e.target as HTMLInputElement).value)
                }
              />{" "}
              <div className="mt-3">
                <input
                  type="checkbox"
                  onChange={() => setNeedPassword(!needPassword)}
                />{" "}
                Make URL password-locked?
              </div>
              <div className="mt-2">
                <label className="font-bold text-[#442E26]">
                  Your URL password
                </label>
                <div>
                  <input
                    required={needPassword}
                    disabled={!needPassword}
                    className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded-md"
                    id="password"
                    type="text"
                    value={URLPassword}
                    onChange={(e: SyntheticEvent<HTMLInputElement>) =>
                      setURLPassword((e.target as HTMLInputElement).value)
                    }
                  />
                </div>
              </div>
              {/* https://bobbyhadz.com/blog/typescript-property-value-not-exist-type-eventtarget */}
              <div className="text-center">
                <button
                  type="submit"
                  className="border px-2 py-1 mt-5 rounded-md"
                  onClick={() => {}}
                >
                  {loading ? "Working...." : "Shorten"}
                </button>
              </div>
            </form>
            <div className="border px-2 py-2 mt-5 rounded-md">
              Shortened URL:{" "}
              <Link target={"_blank"} href={`/${shortMeta.slug}`}>
                <a target={"_blank"} className="underline mx-2 text-[#B98853]">
                  {host}/{shortMeta.slug || shortMeta.error}
                </a>
              </Link>
              {/* <FAQ file={html} /> */}
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </section>
  );
}

export async function getStaticProps() {
  const { read } = await import("to-vfile");
  const file = await unified()
    .use(remarkHtml)
    .use(remarkParse)
    .process(await read("faq.md"));

  return {
    props: {
      html: file.value,
    },
  };
}
