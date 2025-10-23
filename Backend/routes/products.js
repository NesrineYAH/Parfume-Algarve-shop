const express = require("express");
const router = express.Router();
const Parfum = require("../Model/parfumModel"); // import correct du modèle
const products = require("../data/products");

// Route pour obtenir tous les produits
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;

////////////////////////////

// ✅ GET /data/products → renvoie la liste des produits
/*

try {
    const products = await Parfum.find(); // utiliser Parfum ici
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }


module.exports = router;
*/
