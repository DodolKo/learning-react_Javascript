// src/config/env.js
// Configuration des variables d'environnement pour l'application

export const ENV_CONFIG = {
  // Configuration météo
  WEATHER: {
    DEFAULT_CITY: import.meta.env.VITE_WEATHER_DEFAULT_CITY || 'Bruxelles',
    REFRESH_INTERVAL: parseInt(import.meta.env.VITE_WEATHER_REFRESH_INTERVAL) || 300000, // 5 minutes
    OPENWEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || null,
    WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY || null
  },
  
  // Configuration API
  API: {
    OPEN_METEO: {
      GEOCODING_URL: 'https://geocoding-api.open-meteo.com/v1/search',
      WEATHER_URL: 'https://api.open-meteo.com/v1/forecast'
    },
    OPEN_WEATHER: {
      BASE_URL: 'https://api.openweathermap.org/data/2.5',
      API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || null
    }
  },
  
  // Configuration générale
  APP: {
    NODE_ENV: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD
  }
};

// Fonction utilitaire pour vérifier si une clé API est disponible
export const hasApiKey = (service) => {
  switch (service) {
    case 'openweather':
      return !!ENV_CONFIG.API.OPEN_WEATHER.API_KEY;
    case 'weather':
      return !!ENV_CONFIG.WEATHER.WEATHER_API_KEY;
    default:
      return false;
  }
};

// Fonction pour obtenir la configuration météo
export const getWeatherConfig = () => ({
  defaultCity: ENV_CONFIG.WEATHER.DEFAULT_CITY,
  refreshInterval: ENV_CONFIG.WEATHER.REFRESH_INTERVAL,
  hasOpenWeatherKey: hasApiKey('openweather'),
  hasWeatherKey: hasApiKey('weather')
});
