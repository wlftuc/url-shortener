import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { ToastUX } from "../lib/toasts";
import toast, { Toaster } from "react-hot-toast";
import QRCode from "react-qr-code";

type ShortenedURL = {
  slug: string;
  origin: "web" | "bot";
  error?: boolean;
  isExisting?: boolean;
  link?: string
  errResp?: string;
};

export default function Index() {
  const [url, setUrl] = useState("");
  const [shortMeta, setShortMeta] = useState<ShortenedURL>({
    slug: "",
    origin: "web",
  });
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
    <section className="bg-gray-100  h-screen">
      <div className="max-w-2xl mx-auto flex items-center justify-center h-screen">
        <div className="relative">
          <label className="block text-5xl font-semibold" htmlFor="email">
            URL shortener
          </label>
          <div className="relative">
            <form onSubmit={handleSubmit}>
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
              {/* https://bobbyhadz.com/blog/typescript-property-value-not-exist-type-eventtarget */}
              <div className="text-center">
                <button
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
                <a target={"_blank"} className="underline mx-2 text-green-600">
                  {host}/{shortMeta.slug || shortMeta.error}
                </a>
              </Link>
              <div></div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <QRCode
              className="mt-3"
              size={100}
              value={host + "/" + shortMeta.slug}
            />
          </div>
        </div>
      </div>
      {/* <Toaster 
      toastOptions={{
        className: "p-2 border rounded-md mt-3 bg-green-200",
        style: {
          padding: '0.5rem',
          borderWidth: '1px',
          backgroundColor: 'rgb(187 247 208)',
          borderRadius: '0.375rem'
        }
      }}
      /> */}
      <Toaster />
    </section>
  );
}
