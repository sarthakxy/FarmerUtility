// src/Components/WeatherForecast.js
import React from "react";
import { motion } from "framer-motion";
import './WeatherForecast.css';

const WeatherForecast = ({ weatherData }) => {
  const current = weatherData?.list?.[0];
  const hourly = weatherData?.list?.slice(0, 5);
  const daily = weatherData?.list?.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="forecast-wrapper">
      {/* Current Weather Overview */}
      <div className="current-overview">
        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <div className="label">Temperature</div>
          <div className="value">{Math.round(current?.main?.temp)}°C</div>
        </motion.div>
        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <div className="label">Feels Like</div>
          <div className="value">{Math.round(current?.main?.feels_like)}°C</div>
        </motion.div>
        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <div className="label">Humidity</div>
          <div className="value">{current?.main?.humidity}%</div>
        </motion.div>
        <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
          <div className="label">Wind</div>
          <div className="value">{current?.wind?.speed} m/s</div>
        </motion.div>
      </div>

      {/* Hourly Forecast */}
      <div className="forecast-section">
        <h3 className="section-title">Hourly Forecast</h3>
        <div className="scroll-x">
          {hourly.map((hour, index) => (
            <motion.div
              key={index}
              className="forecast-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div>{new Date(hour.dt * 1000).getHours()}:00</div>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <div>{Math.round(hour.main.temp)}°</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Forecast */}
      <div className="forecast-section">
        <h3 className="section-title">5-Day Forecast</h3>
        <div className="daily-grid">
          {daily.map((day, index) => (
            <motion.div
              key={index}
              className="forecast-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <div>{Math.round(day.main.temp)}°</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
