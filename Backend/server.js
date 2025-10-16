const express = require("express");
const cors = require("cors");
const app = express();
require("./mongoDB/DB"); // connexion MongoDB

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/data/products", require("./routes/products"));
app.use("/data/users", require("./routes/users/Register"));
app.use("/data/users", require("./routes/users/Login"));

app.get("/", (req, res) => {
  res.send("Backend en marche 🚀");
});

// Démarrer serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API parfum en ligne sur http://localhost:${PORT}`);
});
