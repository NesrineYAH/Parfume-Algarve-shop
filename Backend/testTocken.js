// testToken.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

console.log('🔑 Token depuis .env:', process.env.CLE_TOKEN);
console.log('📏 Longueur du token:', process.env.CLE_TOKEN?.length);

// Test de génération d'un token
try {
  const testToken = jwt.sign(
    { userId: 'test', email: 'test@test.com' },
    process.env.CLE_TOKEN,
    { expiresIn: '1h' }
  );
  console.log('✅ Token généré avec succès!');
  console.log('📄 Token exemple:', testToken);
} catch (error) {
  console.log('❌ Erreur avec le token:', error.message);
}