// frontend/src/services/authService.js
import axios from "axios";

// ✅ URL de base de ton backend
const API_URL = "http://localhost:5000/data/auth";

// Inscription
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l’inscription :", error);
    throw error.response?.data || error.message;
  }
};

// Connexion
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error.response?.data || error.message;
  }
};

// (Optionnel) Gestion du token
export const logoutUser = () => localStorage.removeItem("token");
export const isAuthenticated = () => !!localStorage.getItem("token");
