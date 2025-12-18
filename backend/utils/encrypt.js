const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_SECRET_KEY);
const iv = Buffer.from(process.env.AES_IV);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

module.exports = encrypt;
