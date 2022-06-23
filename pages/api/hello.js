// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encrypt, decrypt } from "../../lib/secure/secure";
export default function handler(req, res) {

  const a = encrypt("helloworld")
  const d = decrypt(a)

  console.log(a)
  console.log(d)
  

  return res.status(200).json({
    message: "Hello World",
    wrong: true,
  });
}
