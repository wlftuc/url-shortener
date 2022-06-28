import { NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest } from "next";
import { Hash } from "../../lib/secure/secure";

let { HASH_TOKEN, SECURE_AES_IV } = process.env;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    //@ts-expect-error TEST
    [1, 5, 5, 5, 2].split();
    return res.status(200).json({
      works: true,
    });
  } catch (err) {
    throw new Error(err, { cause: err });
  }
}
