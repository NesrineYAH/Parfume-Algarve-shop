const User = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Regex pour validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/;
const signatureToken = process.env.CLE_TOKEN;

// Register - Complet avec toutes les validations
exports.Register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validation des champs requis
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Validation email avec regex
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email non valide" });
    }

    // Validation password avec regex
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial",
      });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet utilisateur existe déjà" });
    }

    // Vérification si le username est déjà pris
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ error: "Ce nom d'utilisateur est déjà pris" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });

    await user.save();

    // Génération du token après inscription
    const token = jwt.sign({ userId: user._id }, signatureToken, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller/userController.js
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📧 Email reçu:", email);
    console.log("🔑 Password reçu:", password);
    console.log("📦 Body complet:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    console.log("👤 Utilisateur trouvé:", user ? "OUI" : "NON");

    if (!user) {
      console.log("❌ Aucun utilisateur avec cet email");
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    console.log("🔐 Mot de passe hashé en DB:", user.password);
    console.log("🔑 Mot de passe reçu (clair):", password);

    // Vérification du mot de passe
    const match = await bcrypt.compare(password, user.password);
    console.log("✅ Comparaison bcrypt:", match);

    if (!match) {
      console.log(
        "❌ Mot de passe incorrect - bcrypt.compare a retourné false"
      );
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Génération du token
    const token = jwt.sign({ userId: user._id }, process.env.CLE_TOKEN, {
      expiresIn: "24h",
    });

    console.log("🎉 Connexion réussie pour:", email);

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  } catch (err) {
    console.error("💥 Erreur login:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur getProfile:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
