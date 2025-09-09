# Configuration des variables d'environnement

## 📁 Fichier .env

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```bash
# Configuration météo
VITE_WEATHER_DEFAULT_CITY=Bruxelles
VITE_WEATHER_REFRESH_INTERVAL=300000

# Clés API (optionnel)
VITE_OPENWEATHER_API_KEY=votre_clé_ici
VITE_WEATHER_API_KEY=votre_clé_ici
```

## 🔧 Variables disponibles

### Configuration météo
- `VITE_WEATHER_DEFAULT_CITY` : Ville par défaut (défaut: "Bruxelles")
- `VITE_WEATHER_REFRESH_INTERVAL` : Intervalle de refresh en ms (défaut: 300000 = 5min)

### Clés API (optionnel)
- `VITE_OPENWEATHER_API_KEY` : Clé pour OpenWeatherMap API
- `VITE_WEATHER_API_KEY` : Clé pour d'autres APIs météo

## 📝 Notes importantes

- Le préfixe `VITE_` est obligatoire pour Vite
- Redémarrez le serveur après modification du `.env`
- Open-Meteo est gratuit et ne nécessite pas de clé API
- Les variables sans `VITE_` ne sont pas accessibles côté client
