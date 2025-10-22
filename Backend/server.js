const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./mongoDB/DB"); // connexion MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/data/products", require("./routes/products"));
app.use("/auth", require("./routes/auth/Login"));
app.use("/auth", require("./routes/auth/Register"));

// Route test
app.get("/", (req, res) => {
  res.send("Backend en marche 🚀");
});

module.exports = app;
