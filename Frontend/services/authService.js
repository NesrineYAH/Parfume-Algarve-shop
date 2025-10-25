// frontend/src/services/authService.js

const BASE_URL = "http://localhost:5000/data/auth";
/*
export async function loginUser(formData) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Erreur lors de la connexion");
  return await res.json();
}

export async function registerUser(formData) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Erreur lors de l’inscription");
  return await res.json();
}
*/
export async function loginUser(formData) {
  const res = await fetch(`${BASE_URL}/login`, {
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

export async function registerUser(formData) {
  const res = await fetch(`${BASE_URL}/register`, {
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
