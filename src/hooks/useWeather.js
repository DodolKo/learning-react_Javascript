// src/hooks/useWeather.js
import { useEffect, useRef, useCallback } from 'react';
import { useWeatherStore } from '@/stores/WeatherStore';
import { ENV_CONFIG } from '@/config/env';

/**
 * Hook pour consommer les données météo
 * Auto-initialise le timer au premier usage
 * Utilise les valeurs par défaut depuis .env si non fournies
 * 
 * @param {string} city - Ville pour la météo (défaut: depuis .env)
 * @param {number} refreshInterval - Intervalle de refresh en ms (défaut: depuis .env)
 * @returns {Object} Données météo en temps réel
 */
export const useWeather = (city = null, refreshInterval = null) => {
  // Récupération des données du store
  const weather = useWeatherStore((state) => state.weather);
  const config = useWeatherStore((state) => state.config);
  const initializeWeather = useWeatherStore((state) => state.initializeWeather);
  const changeCity = useWeatherStore((state) => state.changeCity);
  const stopWeatherTimer = useWeatherStore((state) => state.stopWeatherTimer);
  
  // Utiliser les valeurs par défaut depuis .env si non fournies
  const defaultCity = city || config.defaultCity;
  const defaultInterval = refreshInterval || config.refreshInterval;
  
  // Ref pour éviter les initialisations multiples
  const isInitialized = useRef(false);
  
  // Fonction stable pour l'initialisation
  const stableInitializeWeather = useCallback((city, interval) => {
    initializeWeather(city, interval);
  }, [initializeWeather]);
  
  // Auto-initialisation du timer au premier usage UNIQUEMENT
  useEffect(() => {
    if (!isInitialized.current) {
      console.log('🚀 Initialisation météo (une seule fois)');
      stableInitializeWeather(defaultCity, defaultInterval);
      isInitialized.current = true;
    }
  }, [defaultCity, defaultInterval, stableInitializeWeather]);
  
  // Cleanup séparé pour éviter les arrêts prématurés
  useEffect(() => {
    return () => {
      console.log('🛑 Arrêt timer météo (cleanup)');
      stopWeatherTimer();
    };
  }, [stopWeatherTimer]);
  
  // Fonction pour changer de ville
  const updateCity = (newCity) => {
    changeCity(newCity);
  };
  
  return {
    // Données météo
    city: weather.city,
    temp: weather.temp,
    apparentTemp: weather.apparentTemp,
    condition: weather.condition,
    humidity: weather.humidity,
    pressure: weather.pressure,
    windSpeed: weather.windSpeed,
    windDirection: weather.windDirection,
    cloudCover: weather.cloudCover,
    precipitation: weather.precipitation,
    isLoaded: weather.isLoaded,
    
    // Configuration
    config,
    
    // Actions
    updateCity,
    
    // État complet pour debug
    weather
  };
};
