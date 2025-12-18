const express = require("express");
const User = require("../models/User");
const decrypt = require("../utils/decrypt");
const tokenValidation = require("../utils/tokenValidation");

const router = express.Router();

/**
 * GET USER PROFILE (Protected)
 */
router.get("/me", tokenValidation, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const decryptedAadhaar = decrypt(user.aadhaarEncrypted);

    res.json({
      name: user.name,
      email: user.email,
      aadhaar: decryptedAadhaar
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
