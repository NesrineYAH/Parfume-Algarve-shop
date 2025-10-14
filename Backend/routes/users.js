const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Model/userModel"); // ton modèle Mongoose
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/emailService"); // fonction pour envoyer des emails

// GET /users - liste des utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ne pas renvoyer le password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = router;
