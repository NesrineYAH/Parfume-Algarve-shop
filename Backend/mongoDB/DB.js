const mongoose = require("mongoose");
require("dotenv").config();
const configUser = process.env.CONFIG_USER;
const configPassword = process.env.CONFIG_PASSWORD;

const uri = `mongodb+srv://${configUser}:${configPassword}@cluster0.2smj5ws.mongodb.net/TasksDB?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => {
    console.error("Erreur de connexion à MongoDB :", e);
  });
