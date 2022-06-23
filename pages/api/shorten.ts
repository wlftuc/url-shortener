import type { NextApiRequest, NextApiResponse } from "next";

import { URL } from "url";
import { prisma } from "../../lib/prisma";
import { encrypt, decrypt } from "../../lib/secure/secure";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { url, origin } = req.body;
  const { password } = req.query;

  if (!password) {
    return res.status(400).json({
      error: true,
      errResp: "Invalid API key.",
    });
  }

  let slug = (Math.random() + 1).toString(36).substring(7);

  const isExistingURL = await prisma.shortener.findFirst({
    where: {
      redirectTo: url,
    },
  });

  if (isExistingURL) {
    return res.status(202).json({
      slug: isExistingURL.slug,
      origin: isExistingURL.redirectTo,
      isExisting: true,
    });
  }

  try {
    const shortenNewURL = await prisma.shortener.create({
      data: {
        slug: slug,
        redirectTo: url,
        origin: origin,
      },
    });

    res.status(200).json({
      slug: shortenNewURL.slug,
      origin: shortenNewURL.redirectTo,
      isExisting: false,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      errResp: err.message,
    });
  }
}
