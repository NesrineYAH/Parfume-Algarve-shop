const User = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/;
const signatureToken = process.env.CLE_TOKEN;
const authService = require("../data/auth/authService.js");

exports.Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const result = await authService.registerUser(email, password, username);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes("existe") || error.message.includes("valide")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // normalisation
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const result = await authService.loginUser(cleanEmail, cleanPassword);
    res.status(200).json(result);
  } catch (error) {
    if (
      error.message.includes("Mot de passe") ||
      error.message.includes("Utilisateur")
    ) {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
