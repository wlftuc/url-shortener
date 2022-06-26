import React from "react";

import { NextSeo } from "next-seo";

export default function SEO({ title, description, ogImageUrl }) {
  return (
    <div>
      <NextSeo
        title={`${title}`}
        description="an intuitive url shortener with some neat features"
        openGraph={{
          url: "https://short.wlftuc.com",
          title: title,
          description: description,
          images: [
            {
              url: ogImageUrl,
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: ogImageUrl,
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: ogImageUrl },
            { url: ogImageUrl },
          ],
          site_name: "shortU",
        }}
        twitter={{
          handle: "@wlftuc",
          site: "https://short.wlftuc.com",
          cardType: "summary_large_image",
        }}
      />
    </div>
  );
}
