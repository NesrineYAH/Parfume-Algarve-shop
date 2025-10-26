// frontend/src/services/authService.js

const API_URL = "http://localhost:5000/data/users";

// Fonction pour récupérer le token du localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// Fonction pour sauvegarder le token
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Fonction pour supprimer le token (logout)
export function removeToken() {
  localStorage.removeItem("token");
}

// Inscription
export async function registerUser(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || errorData.error || "Erreur lors de l'inscription"
    );
  }

  const result = await response.json();

  // Sauvegarder le token si présent dans la réponse
  if (result.token) {
    setToken(result.token);
  }

  return result;
}

// Connexion
export async function loginUser(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || errorData.error || "Erreur lors de la connexion"
    );
  }

  const result = await response.json();

  // Sauvegarder le token
  if (result.token) {
    setToken(result.token);
    console.log("Token sauvegardé:", result.token);
  }

  return result;
}

// Déconnexion
export function logoutUser() {
  removeToken();
  console.log("Utilisateur déconnecté");
}

// Récupérer le profil utilisateur (requête protégée)
export async function getUserProfile() {
  const token = getToken();

  if (!token) {
    throw new Error("Aucun token d'authentification trouvé");
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Erreur lors de la récupération du profil"
    );
  }

  return await response.json();
}

// Vérifier si l'utilisateur est connecté
export function isAuthenticated() {
  const token = getToken();
  return !!token; // Retourne true si le token existe
}

// Fonction utilitaire pour les requêtes authentifiées
export async function authenticatedFetch(url, options = {}) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentification requise");
  }

  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const mergedOptions = { ...options, ...defaultOptions };

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la requête");
  }

  return await response.json();
}
