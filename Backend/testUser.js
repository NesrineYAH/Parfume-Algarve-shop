// testUser.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Model/userModel"); // Ajustez le chemin

async function testUser() {
  try {
    // Connexion à la DB
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/parfumsDB"
    );
    console.log("✅ Connecté à la DB");

    // Chercher tous les utilisateurs
    const users = await User.find();
    console.log("👥 Utilisateurs en base:");
    users.forEach((user) => {
      console.log(`- ${user.email} (${user.username})`);
    });

    // Test avec un email spécifique
    const testEmail = "babosaida87@gmail.com";
    const user = await User.findOne({ email: testEmail });

    if (user) {
      console.log("✅ Utilisateur trouvé:", user.email);
      console.log("🔐 Password hash:", user.password);

      // Test du mot de passe
      const testPassword = "Saida87*";
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log("🔑 Test bcrypt.compare:", isMatch);
    } else {
      console.log("❌ Utilisateur non trouvé avec email:", testEmail);
    }
  } catch (error) {
    console.error("💥 Erreur:", error);
  } finally {
    mongoose.connection.close();
  }
}

testUser();
