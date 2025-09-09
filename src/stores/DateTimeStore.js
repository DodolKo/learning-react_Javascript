import { create } from 'zustand';

export const useDateTimeStore = create((set, get) => ({
  // État initial
  currentDateTime: {
    date: '',
    time: '',
    month: '',
    day: '',
    year: '',
    isLoaded: false
  },
  
  // Timer global (une seule instance)
  timerInterval: null,
  
  // Actions
  setDateTime: (dateTimeData) => set({ 
    currentDateTime: { ...dateTimeData, isLoaded: true } 
  }),
  
  // Fonction pour formater la date
  formatDate: (date = new Date()) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  },
  
  // Fonction pour formater l'heure
  formatTime: (date = new Date()) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleTimeString('fr-FR', options);
  },
  
  // Fonction pour extraire le mois
  getMonth: (date = new Date()) => {
    const options = { month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  },
  
  // Fonction pour extraire le jour
  getDay: (date = new Date()) => {
    const options = { day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  },
  
  // Fonction pour extraire l'année
  getYear: (date = new Date()) => {
    const options = { year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  },
  
  // Fonction pour mettre à jour la date/heure
  updateDateTime: () => {
    const now = new Date();
    const dateTimeData = {
      date: get().formatDate(now),
      time: get().formatTime(now),
      month: get().getMonth(now),
      day: get().getDay(now),
      year: get().getYear(now)
    };
    set({ 
      currentDateTime: { ...dateTimeData, isLoaded: true } 
    });
    return dateTimeData;
  },
  
  // Fonction pour initialiser avec un timer (auto-initialisation)
  initializeDateTime: () => {
    const state = get();
    
    // Éviter les timers multiples
    if (state.timerInterval) {
      return; // Timer déjà actif
    }
    
    console.log('⏰ Initialisation du timer global date/heure');
    
    // Mise à jour immédiate
    get().updateDateTime();
    
    // Mise à jour toutes les secondes
    const interval = setInterval(() => {
      get().updateDateTime();
    }, 1000);
    
    // Sauvegarder la référence du timer
    set({ timerInterval: interval });
  },
  
  // Fonction pour arrêter le timer
  stopTimer: () => {
    const state = get();
    if (state.timerInterval) {
      console.log('🛑 Arrêt du timer global date/heure');
      clearInterval(state.timerInterval);
      set({ timerInterval: null });
    }
  }
}));
