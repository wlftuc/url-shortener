import type { NextApiRequest, NextApiResponse } from "next";

import { URL } from "url";
import { prisma } from "../../lib/prisma";

import { Hash } from "../../lib/secure/secure";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { url, origin } = req.body;
  const { password } = req.query;
  const { API_ROUTE_TOKEN } = process.env;

  if (!password || password !== process.env.NEXT_PUBLIC_API_KEY) {
    return res.status(400).json({
      error: true,
      errResp: "Invalid API key.",
    });
  }

  const hash = new Hash(API_ROUTE_TOKEN);
  const encryptedURL = hash.encrypt(url);

  let slug = (Math.random() + 1).toString(36).substring(7);

  const isExistingURL = await prisma.shortener.findFirst({
    where: {
      redirectTo: encryptedURL,
    },
  });

  if (isExistingURL) {
    return res.status(202).json({
      slug: isExistingURL.slug,
      link: hash.decrypt(isExistingURL.redirectTo),
      origin: isExistingURL.origin,
      isExisting: true,
    });
  }

  try {
    const shortenNewURL = await prisma.shortener.create({
      data: {
        slug: slug,
        redirectTo: encryptedURL,
        origin: origin,
      },
    });

    res.status(200).json({
      slug: shortenNewURL.slug,
      link: hash.decrypt(shortenNewURL.redirectTo),
      origin: shortenNewURL.origin,
      isExisting: false,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      errResp: err.message,
    });
  }
}
