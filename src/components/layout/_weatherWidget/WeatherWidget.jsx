// WeatherWidget.jsx
import { useEffect, useRef, useState } from "react";
import './weatherWidget.css';

export default function WeatherWidget({ place = "Bruxelles", intervalMs = 15000, className = "" }) {
  const [geo, setGeo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);

  const wmoToText = (c) => {
    if (c === 0) return "Ciel dégagé";
    if (c === 1) return "Plutôt dégagé";
    if (c === 2) return "Partiellement nuageux";
    if (c === 3) return "Couvert";
    if ([45, 48].includes(c)) return "Brouillard";
    if ([51, 53, 55].includes(c)) return "Bruine";
    if ([56, 57].includes(c)) return "Bruine verglaçante";
    if (c === 61) return "Pluie faible";
    if (c === 63) return "Pluie modérée";
    if (c === 65) return "Pluie forte";
    if ([66, 67].includes(c)) return "Pluie verglaçante";
    if (c === 71) return "Neige faible";
    if (c === 73) return "Neige modérée";
    if (c === 75) return "Neige forte";
    if (c === 80) return "Averses faibles";
    if (c === 81) return "Averses modérées";
    if (c === 82) return "Averses fortes";
    if (c === 95) return "Orage";
    if ([96, 99].includes(c)) return "Orage avec grêle";
    return "Indéterminé";
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code === 1 || code === 2) return "⛅";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
    if ([61, 63, 65, 66, 67].includes(code)) return "🌧️";
    if ([71, 73, 75].includes(code)) return "❄️";
    if ([80, 81, 82].includes(code)) return "🌦️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌤️";
  };

  // Géocodage (nom de ville -> lat/lon)
  useEffect(() => {
    // Nettoyer le précédent controller s'il existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);
    setGeo(null);

    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", place);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "fr");
    url.searchParams.set("format", "json");

    fetch(url, { signal: abortControllerRef.current.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Erreur réseau (géocodage)");
        return r.json();
      })
      .then((d) => {
        if (!d.results || !d.results.length) throw new Error("Localité introuvable");
        const g = d.results[0];
        setGeo({
          lat: g.latitude,
          lon: g.longitude,
          label: `${g.name}${g.country ? ", " + g.country : ""}`,
        });
      })
      .catch((e) => {
        // Ignorer les erreurs d'abort
        if (e.name !== 'AbortError') {
          setError(e.message);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [place]);

  // Requêtes météo
  useEffect(() => {
    if (!geo) return;

    const tick = () => {
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", geo.lat);
      url.searchParams.set("longitude", geo.lon);
      url.searchParams.set("current", "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,pressure_msl,weather_code");
      url.searchParams.set("timezone", "auto");

      fetch(url)
        .then((r) => {
          if (!r.ok) throw new Error("Erreur réseau (météo)");
          return r.json();
        })
        .then((d) => {
          const c = d.current;
          setWeatherData({
            temperature: c.temperature_2m,
            apparentTemperature: c.apparent_temperature,
            humidity: c.relative_humidity_2m,
            windSpeed: c.wind_speed_10m,
            pressure: c.pressure_msl,
            weatherCode: c.weather_code
          });
        })
        .catch((e) => setError(e.message));
    };

    tick(); // première requête immédiate
    timerRef.current = setInterval(tick, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [geo, intervalMs]);

  if (loading) return <div className={`weather-widget weather-widget__loading ${className}`}>Chargement…</div>;
  if (error) return <div className={`weather-widget weather-widget__error ${className}`}>⚠️ {error}</div>;

  return (
    <div className={`weather-widget ${className}`}>
      <div className="weather-widget__main">
        <div className="weather-widget__left">
          <div className="weather-widget__condition">
            <span className="weather-widget__icon">{getWeatherIcon(weatherData?.weatherCode)}</span>
            <span>{wmoToText(weatherData?.weatherCode)}</span>
          </div>
          <div className="weather-widget__location">{geo?.label}</div>
        </div>
        <div className="weather-widget__temperature">
          {weatherData?.temperature ? `${Math.round(weatherData.temperature)}°` : "n/a"}
        </div>
      </div>
      
      <div className="weather-widget__details">
        <div className="weather-widget__detail">
          <span className="weather-widget__detail-value">
            {weatherData?.apparentTemperature ? `${Math.round(weatherData.apparentTemperature)}°` : "n/a"}
          </span>
          <span className="weather-widget__detail-label">Sensible</span>
        </div>
        <div className="weather-widget__detail">
          <span className="weather-widget__detail-value">
            {weatherData?.humidity ? `${Math.round(weatherData.humidity)}%` : "n/a"}
          </span>
          <span className="weather-widget__detail-label">Humidity</span>
        </div>
        <div className="weather-widget__detail">
          <span className="weather-widget__detail-value">
            {weatherData?.windSpeed ? `${Math.round(weatherData.windSpeed)}` : "n/a"}
          </span>
          <span className="weather-widget__detail-label">W. force</span>
        </div>
        <div className="weather-widget__detail">
          <span className="weather-widget__detail-value">
            {weatherData?.pressure ? `${Math.round(weatherData.pressure)}` : "n/a"}
          </span>
          <span className="weather-widget__detail-label">hpa Pressure</span>
        </div>
      </div>
    </div>
  );
}
