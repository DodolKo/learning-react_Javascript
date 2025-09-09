import { create } from 'zustand';
import { ENV_CONFIG, getWeatherConfig } from '@/config/env';

export const useWeatherStore = create((set, get) => ({
  // État initial
  weather: {
    city: '',
    temp: null,
    apparentTemp: null,
    condition: null,
    humidity: null,
    pressure: null,
    windSpeed: null,
    windDirection: null,
    cloudCover: null,
    precipitation: null,
    isLoaded: false
  },
  
  // Configuration depuis .env
  config: getWeatherConfig(),
  
  // Timer pour auto-refresh
  timerInterval: null,
  
  // États de contrôle pour éviter les requêtes multiples
  isLoading: false,
  lastFetchTime: 0,
  currentRequest: null,
  requestQueue: [], // Queue pour gérer les requêtes en attente
  isProcessingQueue: false,
  
  // Actions
  setWeather: (weatherData) => set({ 
    weather: { ...weatherData, isLoaded: true } 
  }),
  
  // Fonction pour traiter la queue de requêtes
  processRequestQueue: async () => {
    const state = get();
    if (state.isProcessingQueue || state.requestQueue.length === 0) {
      return;
    }
    
    set({ isProcessingQueue: true });
    
    while (state.requestQueue.length > 0) {
      const city = state.requestQueue.shift();
      await get().fetchWeather(city);
    }
    
    set({ isProcessingQueue: false });
  },
  
  // Fonction pour récupérer la météo depuis l'API
  fetchWeather: async (city) => {
    const currentState = get();
    const now = Date.now();
    
    // PROTECTION MAXIMALE contre les requêtes multiples
    if (currentState.isLoading || currentState.isProcessingQueue) {
      console.log('⚠️ Requête déjà en cours, ajoutée à la queue');
      // Ajouter à la queue si pas déjà présent
      if (!currentState.requestQueue.includes(city)) {
        set({ requestQueue: [...currentState.requestQueue, city] });
        // Traiter la queue en arrière-plan
        setTimeout(() => get().processRequestQueue(), 100);
      }
      return currentState.currentRequest || currentState.weather;
    }
    
    // Éviter les requêtes trop fréquentes (minimum 2 secondes entre requêtes)
    if (now - currentState.lastFetchTime < 2000) {
      console.log('⚠️ Requête trop fréquente, ignorée');
      return null;
    }
    
    // Éviter les requêtes si déjà chargé pour la même ville (sauf si plus de 2 minutes)
    if (currentState.weather.isLoaded && 
        currentState.weather.city === city && 
        now - currentState.lastFetchTime < 120000) { // 2 minutes
      console.log('⚠️ Données récentes disponibles, ignorée');
      return currentState.weather;
    }
    
    // Marquer comme en cours de chargement
    set({ 
      isLoading: true, 
      lastFetchTime: now,
      currentRequest: null 
    });
    
    try {
      console.log(`🌤️ Récupération météo pour: ${city}`);
      
      // Utiliser la configuration depuis .env
      const { OPEN_METEO } = ENV_CONFIG.API;
      
      // Géocodage simple
      const geoResponse = await fetch(`${OPEN_METEO.GEOCODING_URL}?name=${city}&count=1&language=fr`);
      
      if (!geoResponse.ok) {
        throw new Error(`Erreur géocodage: ${geoResponse.status}`);
      }
      
      const geoData = await geoResponse.json();
      
      if (geoData.results?.[0]) {
        const { latitude, longitude, name, country } = geoData.results[0];
        
        // Météo enrichie avec plus de données
        const weatherResponse = await fetch(`${OPEN_METEO.WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,precipitation,pressure_msl,wind_speed_10m,wind_direction_10m,cloud_cover&timezone=auto`);
        
        if (!weatherResponse.ok) {
          throw new Error(`Erreur API météo: ${weatherResponse.status}`);
        }
        
        const weatherData = await weatherResponse.json();
        
        // Vérifier que les données météo sont présentes
        if (!weatherData.current) {
          throw new Error('Données météo non disponibles');
        }
        
        const weatherInfo = {
          city: `${name}${country ? ', ' + country : ''}`,
          temp: Math.round(weatherData.current.temperature_2m),
          apparentTemp: Math.round(weatherData.current.apparent_temperature),
          condition: weatherData.current.weather_code,
          humidity: Math.round(weatherData.current.relative_humidity_2m),
          pressure: Math.round(weatherData.current.pressure_msl),
          windSpeed: Math.round(weatherData.current.wind_speed_10m * 3.6), // Conversion m/s vers km/h
          windDirection: Math.round(weatherData.current.wind_direction_10m),
          cloudCover: Math.round(weatherData.current.cloud_cover),
          precipitation: Math.round(weatherData.current.precipitation * 10) / 10, // Arrondi à 1 décimale
          isLoaded: true
        };
        
        set({ 
          weather: weatherInfo,
          isLoading: false,
          currentRequest: weatherInfo
        });
        console.log('✅ Météo chargée:', weatherInfo);
        return weatherInfo;
      } else {
        throw new Error('Ville introuvable');
      }
    } catch (error) {
      console.error('❌ Erreur météo:', error);
      // Garde l'état précédent en cas d'erreur
      set({ 
        isLoading: false,
        currentRequest: null
      });
      return null;
    }
  },
  
  // Fonction pour initialiser avec un timer (auto-initialisation)
  initializeWeather: (city = null, intervalMs = null) => {
    const state = get();
    
    // ÉVITER LES INITIALISATIONS MULTIPLES
    if (state.timerInterval) {
      console.log('⚠️ Timer déjà actif, ignoré');
      return;
    }
    
    // Utiliser les valeurs par défaut depuis .env si non fournies
    const defaultCity = city || state.config.defaultCity;
    const defaultInterval = intervalMs || state.config.refreshInterval;
    
    console.log(`🌤️ Initialisation météo pour: ${defaultCity} (refresh: ${defaultInterval}ms)`);
    
    // Mise à jour immédiate
    get().fetchWeather(defaultCity);
    
    // Mise à jour périodique avec protection supplémentaire
    const interval = setInterval(() => {
      const currentState = get();
      // Vérifier qu'on n'est pas déjà en train de charger
      if (!currentState.isLoading) {
        get().fetchWeather(defaultCity);
      } else {
        console.log('⚠️ Timer ignoré - requête déjà en cours');
      }
    }, defaultInterval);
    
    // Sauvegarder la référence du timer
    set({ timerInterval: interval });
  },
  
  // Fonction pour arrêter le timer
  stopWeatherTimer: () => {
    const state = get();
    if (state.timerInterval) {
      console.log('🛑 Arrêt du timer météo');
      clearInterval(state.timerInterval);
      set({ timerInterval: null });
    }
  },
  
  // Fonction pour changer de ville
  changeCity: (newCity) => {
    const state = get();
    
    // Vérifier si la ville a vraiment changé
    if (state.weather.city === newCity) {
      console.log('⚠️ Même ville, changement ignoré');
      return;
    }
    
    // Arrêter l'ancien timer
    if (state.timerInterval) {
      get().stopWeatherTimer();
    }
    
    // Redémarrer avec la nouvelle ville
    get().initializeWeather(newCity);
  }
}));
