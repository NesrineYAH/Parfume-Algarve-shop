const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Model/userModel"); 

// POST /users/login - connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    res.json({
      message: "Connexion réussie",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
