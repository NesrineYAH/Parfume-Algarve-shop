// Backend/data/auth/authService.js
const User = require("../../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Enregistrement d'un utilisateur
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer et enregistrer l'utilisateur
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  return { message: "User registered successfully", userId: user._id };
};

// Connexion d'un utilisateur
const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { message: "Login successful", token, userId: user._id };
};

module.exports = {
  registerUser,
  loginUser,
};
