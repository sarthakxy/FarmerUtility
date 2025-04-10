// src/Components/getWeatherBackground.js

export const getWeatherBackground = (condition) => {
    if (!condition) return 'default-bg';
    const cond = condition.toLowerCase();
    if (cond.includes('rain')) return 'rainy-bg';
    if (cond.includes('cloud')) return 'cloudy-bg';
    if (cond.includes('clear') || cond.includes('sun')) return 'sunny-bg';
    if (cond.includes('snow')) return 'snowy-bg';
    if (cond.includes('storm') || cond.includes('thunder')) return 'stormy-bg';
    return 'default-bg';
  };
  