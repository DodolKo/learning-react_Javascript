// src/utils/weatherIcons.js
// Système d'icônes météo basé sur les codes WMO (World Meteorological Organization)

export const getWeatherIcon = (weatherCode) => {
  // Codes WMO Weather interpretation codes (WW)
  const iconMap = {
    // Ciel dégagé
    0: '☀️', // Clear sky
    
    // Partiellement nuageux
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    
    // Brouillard
    45: '🌫️', // Fog
    48: '🌫️', // Depositing rime fog
    
    // Bruine
    51: '🌦️', // Light drizzle
    53: '🌦️', // Moderate drizzle
    55: '🌦️', // Dense drizzle
    
    // Pluie légère
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    
    // Pluie verglaçante
    66: '🌨️', // Light freezing rain
    67: '🌨️', // Heavy freezing rain
    
    // Neige
    71: '❄️', // Slight snow fall
    73: '❄️', // Moderate snow fall
    75: '❄️', // Heavy snow fall
    77: '❄️', // Snow grains
    
    // Averses
    80: '🌦️', // Slight rain showers
    81: '🌧️', // Moderate rain showers
    82: '🌧️', // Violent rain showers
    
    // Averses de neige
    85: '🌨️', // Slight snow showers
    86: '🌨️', // Heavy snow showers
    
    // Orages
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm with slight hail
    99: '⛈️', // Thunderstorm with heavy hail
  };
  
  return iconMap[weatherCode] || '🌤️'; // Icône par défaut
};

export const getWeatherDescription = (weatherCode) => {
  const descriptionMap = {
    0: 'Ciel dégagé',
    1: 'Principalement dégagé',
    2: 'Partiellement nuageux',
    3: 'Couvert',
    45: 'Brouillard',
    48: 'Brouillard givrant',
    51: 'Bruine légère',
    53: 'Bruine modérée',
    55: 'Bruine dense',
    61: 'Pluie légère',
    63: 'Pluie modérée',
    65: 'Pluie forte',
    66: 'Pluie verglaçante légère',
    67: 'Pluie verglaçante forte',
    71: 'Neige légère',
    73: 'Neige modérée',
    75: 'Neige forte',
    77: 'Grains de neige',
    80: 'Averses légères',
    81: 'Averses modérées',
    82: 'Averses violentes',
    85: 'Averses de neige légères',
    86: 'Averses de neige fortes',
    95: 'Orage',
    96: 'Orage avec grêle légère',
    99: 'Orage avec grêle forte',
  };
  
  return descriptionMap[weatherCode] || 'Conditions variables';
};

// Fonction pour obtenir la direction du vent
export const getWindDirection = (degrees) => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
