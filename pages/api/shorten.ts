import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma"; // TYPE SAFE WOHOOO!

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { url, origin } = req.body;

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
      isExisting: true
    });
  }

  try {
    const shortenNewURL = await prisma.shortener.create({
      data: {
        slug: slug,
        redirectTo: url,
      },
    });

    res
      .status(200)
      .json({ slug: shortenNewURL.slug, origin: shortenNewURL.redirectTo });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
}
