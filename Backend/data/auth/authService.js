// Backend/data/auth/authService.js
const User = require("../../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*
const registerUser = async (email, password, username) => {
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Cet utilisateur existe déjà");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword, username });
  await user.save();

  return {
    message: "Utilisateur enregistré avec succès",
    userId: user._id,
  };
};
*/

const registerUser = async (email, password, username) => {
  if (!email || !password || !username) {
    throw new Error("Tous les champs sont requis");
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const existingUser = await User.findOne({ email: cleanEmail });
  if (existingUser) {
    throw new Error("Cet utilisateur existe déjà");
  }

  const hashedPassword = await bcrypt.hash(cleanPassword, 10);

  const user = new User({
    email: cleanEmail,
    password: hashedPassword,
    username,
  });

  await user.save();

  return {
    message: "Utilisateur enregistré avec succès",
    userId: user._id,
  };
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email et mot de passe requis");
  }
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  console.log("Login attempt:", { email, password });

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  // const validPassword = await bcrypt.compare(password.trim(), user.password);
  const validPassword = await bcrypt.compare(cleanPassword, user.password);

  console.log("Password valid ?", validPassword); // true si correct, false sinon

  if (!validPassword) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user._id }, process.env.CLE_TOKEN, {
    expiresIn: "24h",
  });

  return { message: "Connexion réussie", token, userId: user._id };
};

module.exports = { registerUser, loginUser };
