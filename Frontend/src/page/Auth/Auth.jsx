import React, { useState } from "react";
import "./Auth.scss";
import { loginUser, registerUser } from "../../../services/authService"; // 🔹 Nouveau chemin simplifié

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
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
      let data;
      if (isLogin) {
        // Connexion
        data = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        alert("Connexion réussie ✅");
      } else {
        // Inscription
        data = await registerUser({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        });
        alert("Inscription réussie 🎉");
      }

      console.log("✅ Réponse du serveur :", data);

      // Optionnel : stocker le token si login
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Optionnel : redirection après succès
      // window.location.href = "/";

    } catch (error) {
      console.error("❌ Erreur :", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Une erreur est survenue";
      setErrorMessage(message);
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
