const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_SECRET_KEY);
const iv = Buffer.from(process.env.AES_IV);

function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = decrypt; // 👈 THIS LINE IS CRITICAL
