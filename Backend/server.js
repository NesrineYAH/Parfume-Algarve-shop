const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./mongoDB/DB"); // connexion MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Routes
app.use("/data/products", require("./routes/products"));
app.use("/auth", require("./routes/auth/Login"));
app.use("/auth", require("./routes/auth/Register"));

// Route test
app.get("/", (req, res) => {
  res.send("Backend en marche 🚀");
});

app.listen(PORT, () => {
  console.log(`API parfum en ligne sur http://localhost:${PORT}`);
  console.log("Backend en marche 🚀");
});

module.exports = app;
