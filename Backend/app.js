import express from "express";
import fs from "fs";

const app = express();
app.use(express.json()); // obligatoire pour lire req.body

const USERS_FILE = "./data/users.json";

// POST /register
app.post("/data/users/register", (req, res) => {
  const { username, password } = req.body;

  // Vérifie que le username et le password sont fournis
  if (!username || !password) {
    return res.status(400).json({ message: "username et password requis" });
  }

  // Lire les utilisateurs existants
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

  // Vérifie si l'utilisateur existe déjà
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }

  // Créer le nouvel utilisateur
  const newUser = { id: Date.now(), username, password };
  users.push(newUser);

  // Écrire dans le fichier JSON
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.status(201).json(newUser);
});

app.listen(5000, () => console.log("Server running on port 5000"));
export default app;
