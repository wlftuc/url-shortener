// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const CryptoJS = require("crypto-js");

class Hash {
  key: string;
  keyUtf: string;
  iv: string;
  passKey: string;
  passKeyUtf: string;
  constructor(key: string, passKey?: string) {
    this.key = key;
    this.passKey = passKey;
    this.passKeyUtf = CryptoJS.enc.Utf8.parse(passKey);
    this.keyUtf = CryptoJS.enc.Utf8.parse(key);
    this.iv = CryptoJS.enc.Base64.parse(key);
  }

  encrypt(text: string) {
    return CryptoJS.AES.encrypt(text, this.keyUtf, { iv: this.iv }).toString();
  }

  decrypt(cipher: string) {
    const dec = CryptoJS.AES.decrypt(cipher, this.keyUtf, {
      iv: this.iv,
    });

    return CryptoJS.enc.Utf8.stringify(dec);
  }

  hashPassword(password: string) {
    return CryptoJS.HmacSHA256(password, this.passKeyUtf).toString();
  }
}

export { Hash };
