const mongoose = require("mongoose");
const Parfum = require("./Model/parfumModel");
const products = require("./data/products");

require("dotenv").config();

// 🔹 Connecte-toi à la même base que ton projet
mongoose
  .connect("mongodb://127.0.0.1:27017/parfumsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connecté à MongoDB AVEC SUCESS");

    // 🧹 Supprimer les anciens parfums pour éviter les doublons
    await Parfum.deleteMany();

    // 🚀 Insérer les produits depuis ton fichier data/products.js
    await Parfum.insertMany(products);

    console.log("✅ Produits insérés dans la base mongoDB ! ✅");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ Erreur MongoDB :", err));
