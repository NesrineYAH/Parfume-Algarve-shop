const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

// Démarrer serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API parfum en ligne sur http://localhost:${PORT}`);
});
