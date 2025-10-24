const User = require("../Model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,32}$/;

const signatureToken = process.env.CLE_TOKEN;

// 🔹 Enregistrement d’un utilisateur
exports.Register = async (req, res) => {
  try {
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({ message: "Email non valide" });
    }

    if (!passwordRegex.test(req.body.password)) {
      return res.status(401).json({ message: "Mot de passe non valide" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });

    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 🔹 Connexion d’un utilisateur
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Paire login/mot de passe incorrecte" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Paire login/mot de passe incorrecte" });

    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, signatureToken, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
