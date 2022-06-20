import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";


type ShortenedUrl = {
  url: string;
}

export default function Index() {
  const [url, setUrl] = useState("");

  const shortenURLTransition = async () => {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        url
      }),
    });
    const data: ShortenedUrl = await res.json();

    return data.url;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const shortenedUrl = await shortenURLTransition()

    console.log(shortenedUrl)
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
                  className="border px-2 py-1 my-2 rounded-md"
                  onClick={() => {}}
                >
                  Shorten
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
