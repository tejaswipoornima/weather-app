// src/Weather.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '8e547cfa446643c5b02175246242406'; // Replace with your actual API key

  const fetchWeather = () => {
    setLoading(true);
    setError(null);
    setWeather(null); // Clear previous weather data
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError('Failed to fetch weather data');
          alert('Failed to fetch weather data');
        });
    }; 
  };

  return (
    <div>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name" 
      />
      <button onClick={fetchWeather}>Search</button>
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;
