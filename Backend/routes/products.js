const express = require("express");
const router = express.Router();
const Parfum = require("../Model/parfumModel"); // import correct du modèle

// Route pour obtenir tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Parfum.find(); // utiliser Parfum ici
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
