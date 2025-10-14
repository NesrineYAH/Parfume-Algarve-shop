import React, { useState } from "react";
import "./Auth.scss";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // Gestion des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/data/users/login"
      : "http://localhost:5000/data/users/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Réponse du serveur :", data);
      alert(isLogin ? "Connexion réussie ✅" : "Inscription réussie 🎉");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card"> 
        <h2>{isLogin ? "Connexion" : "Inscription"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Nom"
              value={formData.username}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            {isLogin ? "Se connecter" : "Créer un compte"}
          </button>
        </form>

        <p>
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
            {isLogin ? "S’inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
