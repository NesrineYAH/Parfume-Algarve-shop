// Backend/Middleware/Auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signatureToken = process.env.CLE_TOKEN;

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const decodedToken = jwt.verify(token, signatureToken);
    req.auth = { userId: decodedToken.userId };

    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = Auth; // ✅ Pas d'accolades ici !
