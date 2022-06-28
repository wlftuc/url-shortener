import { NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest } from "next";
import { Hash } from "../../lib/secure/secure";

let { HASH_TOKEN, SECURE_AES_IV } = process.env;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    message: "Hello World",
    wrong: true,
  });
}
