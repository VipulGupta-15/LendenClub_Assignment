require("dotenv").config();

const encrypt = require("../utils/encrypt");
const decrypt = require("../utils/decrypt");

describe("AES-256 Encryption & Decryption", () => {

  test("should encrypt plaintext Aadhaar", () => {
    const aadhaar = "1234-5678-9012";
    const encrypted = encrypt(aadhaar);

    expect(encrypted).not.toBe(aadhaar);
    expect(typeof encrypted).toBe("string");
  });

  test("should decrypt encrypted Aadhaar correctly", () => {
    const aadhaar = "1234-5678-9012";
    const encrypted = encrypt(aadhaar);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toBe(aadhaar);
  });

  test("encrypted value should be deterministic with same key & IV", () => {
    const aadhaar = "9999-8888-7777";
    const encrypted1 = encrypt(aadhaar);
    const encrypted2 = encrypt(aadhaar);

    expect(encrypted1).toBe(encrypted2);
  });

  test("decryption should fail for tampered ciphertext", () => {
    const aadhaar = "1111-2222-3333";
    const encrypted = encrypt(aadhaar);

    const tampered = encrypted.slice(0, -2) + "aa";

    expect(() => decrypt(tampered)).toThrow();
  });

});
