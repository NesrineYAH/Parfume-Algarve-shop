import React, { useState } from "react";
import "./Auth.scss";
import { loginUser, registerUser } from "../../../services/authService";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Gestion des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const data = isLogin
        ? await loginUser(formData)
        : await registerUser(formData);

      console.log("✅ Réponse du serveur :", data);

      alert(isLogin ? "Connexion réussie ✅" : "Inscription réussie 🎉");

      // Optionnel : redirection après connexion
      // window.location.href = "/";

    } catch (error) {
      console.error("❌ Erreur :", error);
      setErrorMessage(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
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
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Veuillez patienter..."
              : isLogin
              ? "Se connecter"
              : "Créer un compte"}
          </button>
        </form>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <p>
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {isLogin ? "S’inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
