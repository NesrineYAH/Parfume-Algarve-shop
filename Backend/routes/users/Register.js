const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../Model/userModel");
const { sendVerificationEmail } = require("../../utils/mailer");

// POST /users/register - inscription
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

    await sendVerificationEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "Inscription réussie, vérifiez votre email !" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
