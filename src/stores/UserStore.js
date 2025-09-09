import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  // État initial
  user: {
    name: 'K3M0N0', // Valeur par défaut
    email: '',
    avatar: '',
    isLoaded: false
  },
  
  // Actions
  setUser: (userData) => set({ 
    user: { ...userData, isLoaded: true } 
  }),
  
  // Fonction pour charger depuis JSON (phase 1)
  loadUserFromJSON: async () => {
    const currentState = get();
    
    // Éviter les chargements multiples
    if (currentState.user.isLoaded) {
      return;
    }
    
    try {
      const response = await fetch('/data/user.json');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du fichier JSON');
      }
      const userData = await response.json();
      set({ 
        user: { ...userData, isLoaded: true } 
      });
      return userData; // Retourne les données pour les logs dans le composant
    } catch (error) {
      console.error('❌ Erreur chargement JSON:', error);
      // Garde la valeur par défaut en cas d'erreur
      return null;
    }
  },
  
  // Fonction pour charger depuis DB (phase 2 - à implémenter)
  loadUserFromDB: async (userId) => {
    try {
      // TODO: Remplacer par un vrai appel API
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement depuis la DB');
      }
      const userData = await response.json();
      set({ 
        user: { ...userData, isLoaded: true } 
      });
      console.log('✅ Utilisateur chargé depuis DB:', userData);
    } catch (error) {
      console.error('❌ Erreur chargement DB:', error);
      // Fallback vers JSON en cas d'erreur
      get().loadUserFromJSON();
    }
  },
  
  // Fonction pour initialiser (JSON par défaut, DB si userId fourni)
  initializeUser: async (userId = null) => {
    if (userId) {
      return await get().loadUserFromDB(userId);
    } else {
      return await get().loadUserFromJSON();
    }
  }
}));
