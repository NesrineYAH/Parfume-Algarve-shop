import React, { useState } from "react";
import "./Auth.scss";
import Register from "../../components/Register/Register.jsx";
import Login from "../../components/Login/Login.jsx";


function Auth() {

    const [isLogin, setIsLogin]= useState(true);
    const [formData, setFormData] = useState({"username": "", "email": "", "password": ""});


  // Gestion des champs
const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });

};


  // Envoie du formulaire 
  const handleSubmit = async (e) => {
    e.preventDefault();
  

  const url = isLogin
   ? "http://locathost:5000/data/users/login"
   : "http://locathost:5000/data/users/register";

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


return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
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
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "S’inscrire" : "Se connecter"}
        </span>
      </p>
    </div>
  </div>
);


}
const styles = {
  container: { width: "300px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", fontSize: "1rem" },
  button: { padding: "10px", backgroundColor: "#333", color: "#fff", cursor: "pointer" },
};
}

export default Auth;



/*
const styles = {
  container: { width: "300px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", fontSize: "1rem" },
  button: { padding: "10px", backgroundColor: "#333", color: "#fff", cursor: "pointer" },
};
*/





  








  /*

    const [showLogin, setShowLogin] = useState(true);

   <div>
      {showLogin ? <Login /> : <Register />}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Créer un compte" : "Se connecter"}
      </button>
    </div>

  
  */