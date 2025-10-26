// frontend/src/services/authService.js

const API_URL = "http://localhost:5000/data/auth";

export async function registerUser(formData) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json(); // récupère le JSON du backend

  if (!res.ok) {
    throw new Error(data.error || "Erreur lors de l’inscription");
  }

  return data;
}

export async function loginUser(formData) {
  console.log("Password envoyé :", formData.password);

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json(); // récupère le JSON du backend

  if (!res.ok) {
    throw new Error(data.error || "Erreur lors de la connexion");
  }

  return data;
}
