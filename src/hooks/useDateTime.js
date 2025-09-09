// src/hooks/useDateTime.js
import { useEffect } from 'react';
import { useDateTimeStore } from '@/stores/DateTimeStore';

/**
 * Hook pour consommer les données de date/heure
 * Auto-initialise le timer au premier usage
 * 
 * @returns {Object} Données de date/heure en temps réel
 */
export const useDateTime = () => {
  // Récupération des données du store
  const currentDateTime = useDateTimeStore((state) => state.currentDateTime);
  const initializeDateTime = useDateTimeStore((state) => state.initializeDateTime);
  
  // Auto-initialisation du timer au premier usage
  useEffect(() => {
    initializeDateTime(); // S'initialise automatiquement si pas déjà fait
  }, [initializeDateTime]);
  
  return {
    currentDateTime,
    isLoaded: currentDateTime.isLoaded,
    date: currentDateTime.date,
    time: currentDateTime.time,
    month: currentDateTime.month,
    day: currentDateTime.day,
    year: currentDateTime.year
  };
};
