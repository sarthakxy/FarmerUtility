// src/pages/WeatherPage.js
import React, { useState } from 'react';
import WeatherForecast from '../Components/WeatherForecast';
import './WeatherPage.css';

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      console.log('Weather response:', data);

      if (data.cod !== 200) {
        setError(data.message || 'City not found.');
        setWeather(null);
        setForecast(null);
        return;
      }

      const { coord, main, wind, weather: w, name, sys } = data;
      const { lat, lon } = coord;

      setWeather({ main, wind, weather: w, name, sys });

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      console.log('Forecast response:', forecastData);

      // Use the first 3 entries (each is 3-hour interval forecast)
      const dailyForecast = forecastData.list.slice(0, 3);

      setForecast({
        city: name,
        list: dailyForecast,
      });

      setError('');
    } catch (err) {
      console.error('Fetch failed:', err);
      setError('Something went wrong!');
      setWeather(null);
      setForecast(null);
    }
  };

  const handleInputChange = (e) => setCity(e.target.value);
  const handleSearch = () => fetchWeather();

  return (
    <div className="weather-page">
      <div className="weather-card">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Search for a city"
          className="weather-input"
        />
        <button onClick={handleSearch} className="search-btn">🔍</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-content">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
              className="weather-icon"
            />
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p className="description">{weather.weather[0].description}</p>

            <div className="weather-details">
              <div>
                <p>💧 {weather.main.humidity}%</p>
                <p className="label">Humidity</p>
              </div>
              <div>
                <p>🌬️ {weather.wind.speed} Km/h</p>
                <p className="label">Wind Speed</p>
              </div>
              <div>
                <p>🔽 {Math.round(weather.main.temp_min)}°C</p>
                <p className="label">Min Temp</p>
              </div>
              <div>
                <p>🔼 {Math.round(weather.main.temp_max)}°C</p>
                <p className="label">Max Temp</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {forecast && <WeatherForecast data={forecast} />}
    </div>
  );
};

export default WeatherPage;
