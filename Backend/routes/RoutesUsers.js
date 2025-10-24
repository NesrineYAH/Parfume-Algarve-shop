// backend/routes/users.js
const express = require("express");
const router = express.Router();

// Import du contrôleur utilisateur
const userController = require("../Controller/user.js");

// 🔹 Route d'inscription (Register)
router.post("/register", userController.Register);

// 🔹 Route de connexion (Login)
router.post("/login", userController.login);

module.exports = router;
