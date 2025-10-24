// Backend/data/auth/authService.js
const User = require("../../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (email, password, username) => {
  // Vérifier si l'email existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Cet utilisateur existe déjà");
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création et sauvegarde du nouvel utilisateur avec username
  const user = new User({ email, password: hashedPassword, username });
  await user.save();

  return {
    message: "Utilisateur enregistré avec succès",
    userId: user._id,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Mot de passe incorrect");
  }

  // Génération du token JWT
  const token = jwt.sign({ userId: user._id }, process.env.CLE_TOKEN, {
    expiresIn: "24h",
  });

  return {
    message: "Connexion réussie",
    token,
    userId: user._id,
  };
};

module.exports = { registerUser, loginUser };
