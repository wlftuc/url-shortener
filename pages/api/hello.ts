import { NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    //@ts-expect-error TEST
    [1, 5, 5, 5, 2].split();
    return res.status(200).json({
      works: true,
    });
  } catch (err) {
    return res.status(400).json({
      err: err.message,
    });
  }
}
