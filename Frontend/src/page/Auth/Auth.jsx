// frontend/src/components/Auth/Auth.jsx
import React, { useState } from "react";
import "./Auth.scss";
import { loginUser, registerUser } from "../../../services/authService";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation basique
      if (!isLogin && formData.password !== formData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      let result;
      
      if (isLogin) {
        // Connexion
        result = await loginUser({
          email: formData.email,
          password: formData.password
        });
        console.log('Connexion réussie:', result);
      } else {
        // Inscription
        result = await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        console.log('Inscription réussie:', result);
      }

      // Redirection après succès
      window.location.href = '/dashboard';

    } catch (error) {
      console.error('Erreur:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    // Réinitialiser le formulaire
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Champ username seulement pour l'inscription */}
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Champ confirmation mot de passe seulement pour l'inscription */}
          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>

        <p className="switch-mode">
          {isLogin ? "Pas de compte ? " : "Déjà un compte ? "}
          <span onClick={switchMode} className="switch-link">
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;

