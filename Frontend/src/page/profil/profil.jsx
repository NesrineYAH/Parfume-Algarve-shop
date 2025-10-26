// Dans un composant React
import { getUserProfile } from '../services/authService';

async function loadUserProfile() {
  try {
    const profile = await getUserProfile();
    console.log('Profil utilisateur:', profile);
    return profile;
  } catch (error) {
    console.error('Erreur:', error.message);
    // Rediriger vers la page de login si non authentifié
    if (error.message.includes('Authentification')) {
      window.location.href = '/login';
    }
  }
}