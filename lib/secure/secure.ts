// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const CryptoJS = require("crypto-js");

import { HEX_KEY } from "../secrets/secret";

let key = CryptoJS.enc.Hex.parse(HEX_KEY);

let iv = CryptoJS.enc.Hex.parse(`"${process.env.SECURE_AES_IV}"`);

function encrypt(url: string) {
  return CryptoJS.AES.encrypt(url, key, { iv: iv }).toString();
}

function decrypt(cipherText: string) {
  return CryptoJS.AES.decrypt(cipherText, key, { iv: iv }).toString(
    CryptoJS.enc.Utf8
  );
}

export { decrypt, encrypt };
