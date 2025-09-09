// src/hooks/useAppInitialization.js
import { useEffect, useRef } from 'react';
import { useUserStore } from '@/stores/UserStore';

/**
 * Hook personnalisé pour initialiser l'application
 * Centralise toute la logique d'initialisation des stores
 * 
 * @returns {Object} État d'initialisation de l'application
 */
export const useAppInitialization = () => {
  // Récupération des stores (données statiques uniquement)
  const { user, initializeUser } = useUserStore();
  
  // Ref pour éviter les initialisations multiples
  const isInitialized = useRef(false);
  
  /**
   * Initialise l'utilisateur si pas déjà chargé
   * Évite les chargements multiples grâce à la vérification isLoaded
   */
  const initializeUserData = async () => {
    if (!user.isLoaded && !isInitialized.current) {
      try {
        const userData = await initializeUser();
        if (userData) {
          console.log('✅ Utilisateur initialisé:', userData.name);
        }
      } catch (error) {
        console.error('❌ Erreur initialisation utilisateur:', error);
      }
    }
  };
  
  
  // Effet principal d'initialisation (s'exécute une seule fois)
  useEffect(() => {
    // Éviter les initialisations multiples
    if (isInitialized.current) return;
    
    console.log('🚀 Initialisation de l\'application...');
    
    // Initialiser l'utilisateur (asynchrone)
    initializeUserData();
    
    // Marquer comme initialisé
    isInitialized.current = true;
  }, []); // Tableau vide = exécution unique au montage
  
  // Retourner l'état d'initialisation pour les composants qui en ont besoin
  return {
    isUserLoaded: user.isLoaded,
    user
  };
};
