// WeatherWidget.jsx - Version avec store Zustand
import { useWeather } from '@/hooks/useWeather';
import { useEffect } from 'react';
import { getWeatherIcon, getWeatherDescription, getWindDirection } from '@/utils/weatherIcons';
import './weatherWidget.css';

export default function WeatherWidget({ city = "Sambreville", refreshInterval = 120000 }) {
  // Utilisation du hook personnalisé (auto-initialise le store)
  const { 
    city: weatherCity, 
    temp, 
    apparentTemp,
    condition, 
    humidity,
    pressure,
    windSpeed,
    windDirection,
    cloudCover,
    precipitation,
    isLoaded, 
    updateCity 
  } = useWeather(city, refreshInterval);

  // Changement de ville si prop city change - CORRIGÉ avec useEffect
  useEffect(() => {
    if (city && city !== weatherCity) {
      console.log(`🔄 Changement de ville: ${weatherCity} → ${city}`);
      updateCity(city);
    }
  }, [city, weatherCity, updateCity]);

  if (!isLoaded) return <div className="widget_container">Chargement...</div>;
  if (!temp && !condition) return <div className="widget_container">Erreur météo</div>;

  return (
    <div className="widget_container">
      <div className="weather_header">
        <h3>{weatherCity}</h3>
        <div className="weather_icon">{getWeatherIcon(condition)}</div>
      </div>
      
      <div className="weather_main">
        <div className="temp">{temp}°</div>
        <div className="apparent_temp">Ressenti: {apparentTemp}°</div>
        <div className="condition">{getWeatherDescription(condition)}</div>
      </div>
      
      <div className="weather_details">
        <div className="detail_item">
          <span className="detail_label">💧 Humidité:</span>
          <span className="detail_value">{humidity}%</span>
        </div>
        <div className="detail_item">
          <span className="detail_label">🔽 Pression:</span>
          <span className="detail_value">{pressure} hPa</span>
        </div>
        <div className="detail_item">
          <span className="detail_label">💨 Vent:</span>
          <span className="detail_value">{windSpeed} km/h {getWindDirection(windDirection)}</span>
        </div>
        <div className="detail_item">
          <span className="detail_label">☁️ Nuages:</span>
          <span className="detail_value">{cloudCover}%</span>
        </div>
        {precipitation > 0 && (
          <div className="detail_item">
            <span className="detail_label">🌧️ Précipitations:</span>
            <span className="detail_value">{precipitation} mm</span>
          </div>
        )}
      </div>
    </div>
  );
}