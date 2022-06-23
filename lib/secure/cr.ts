

import CryptoJS from 'crypto-js'


let key = CryptoJS.enc.Hex.parse(`000102136495060747090a0b0c0d0e0f`);
console.log(key)
let iv = CryptoJS.enc.Hex.parse(`"${process.env.SECURE_AES_IV}"`);


const e =  CryptoJS.AES.encrypt("Message", key, { iv: iv }).toString()
const d = CryptoJS.AES.decrypt(e, key, {iv: iv}).toString(CryptoJS.enc.Utf8)

console.log(e)
console.log(d)