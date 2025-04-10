// src/Pages/WeatherPage.js
import React, { useEffect, useState } from 'react';
import WeatherForecast from '../Components/WeatherForecast';
import { getWeatherBackground } from '../Components/getWeatherBackground';
import './WeatherPage.css';
import { motion } from 'framer-motion';

// ✅ Public image paths for background images
const backgroundMap = {
  'rainy-bg': '/Assets/rainy.jpg',
  'sunny-bg': '/Assets/sunny.jpg',
  'cloudy-bg': '/Assets/cloudy.jpg',
  'stormy-bg': '/Assets/stormy.jpg',
  'snowy-bg': '/Assets/snowy.jpg',
  'default-bg': '/Assets/default.jpg',
};

const WeatherPage = () => {
  const [city, setCity] = useState('Hanoi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputCity, setInputCity] = useState('');
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === '200') {
        setWeatherData(data);
        setCity(cityName);
        setCondition(data.list[0].weather[0].main); // e.g. "Rain", "Clear"
      } else {
        setError('City not found!');
      }
    } catch (error) {
      setError('Failed to fetch weather data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData(city);
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      fetchWeatherData(inputCity);
    }
  };

  const backgroundKey = getWeatherBackground(condition);
  const backgroundImage = backgroundMap[backgroundKey];

  return (
    <div
      className="weather-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="weather-backdrop">
        <motion.div
          className="weather-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search city..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="city-title">
            {city && weatherData?.city?.country && `${city}, ${weatherData?.city?.country}`}
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            weatherData && <WeatherForecast weatherData={weatherData} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherPage;
