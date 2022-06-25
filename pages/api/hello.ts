import { NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest } from "next";
import { Hash } from "../../lib/secure/secure";

let { HASH_TOKEN, SECURE_AES_IV } = process.env;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const hash = new Hash(HASH_TOKEN);

  const e = hash.encrypt("https://helloworld.com");
  const d = hash.decrypt(e);

  const hashPass = hash.hashPassword("Hello world!").toString();

  console.log(hashPass);

  if (hashPass === hash.hashPassword("Hello world!").toString())
    console.log(true);

  console.log("here");
  console.log(e);
  console.log(d);

  return res.status(200).json({
    message: "Hello World",
    wrong: true,
  });
}
