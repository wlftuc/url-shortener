import { NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(process.env.NEXT_RUNTIME)
    //@ts-expect-error TEST
    [1, 5, 5, 5, 2].split();
    return res.status(200).json({
      works: true,
    });
  } catch (err) {
    console.log(process.env.NEXT_RUNTIME)
    return res.status(400).json({
      err: err.message,
    });
  }
}
