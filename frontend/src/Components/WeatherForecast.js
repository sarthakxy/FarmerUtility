// src/components/WeatherForecast.js
import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ data }) => {
  if (!data || typeof data !== 'object') return null;

  const { city, current, daily } = data || {};

  // Check if city is a string
  console.log('City value:', city, '| Type:', typeof city);

  // Return early if data is missing
  if (!current || !daily || !Array.isArray(daily)) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="forecast-container">
      <h2>
        3-Day Forecast for {typeof city === 'string' ? city : 'Unknown City'}
      </h2>

      <div className="current-weather card">
        <h3>Current</h3>
        <p><strong>Temp:</strong> {current.temp}°C</p>
        <p><strong>Humidity:</strong> {current.humidity}%</p>
        <p><strong>Wind:</strong> {current.wind_speed} m/s</p>
        <p><strong>Condition:</strong> {current.weather?.[0]?.description}</p>
        {current.weather?.[0]?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description || 'weather icon'}
          />
        )}
      </div>

      <div className="forecast-days">
        {daily.map((day, index) => (
          <div key={index} className="forecast-card card">
            <h4>{formatDate(day.dt)}</h4>
            {day.weather?.[0]?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description || 'forecast icon'}
              />
            )}
            <p><strong>Temp:</strong> {day.temp?.day}°C</p>
            <p><strong>Humidity:</strong> {day.humidity}%</p>
            <p><strong>Wind:</strong> {day.wind_speed} m/s</p>
            <p><strong>Condition:</strong> {day.weather?.[0]?.main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
