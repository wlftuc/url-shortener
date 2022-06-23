// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Hash } from "../../lib/secure/secure";

let { API_ROUTE_TOKEN, SECURE_AES_IV } = process.env;

export default function handler(req, res) {
  const hash = new Hash(SECURE_AES_IV, API_ROUTE_TOKEN);

  const e = hash.encrypt("https://helloworld.com");
  const d = hash.decrypt(e);

  

  console.log("here");
  console.log(e)
  console.log(d)

  return res.status(200).json({
    message: "Hello World",
    wrong: true,
  });
}
