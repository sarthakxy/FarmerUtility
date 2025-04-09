import React, { useState } from 'react';
import './BestPrice.css';

const BestPrice = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const crops = [
    'Rice', 'Amaranth Seed', 'Arhar', 'Arhar Dal Split', 'Bajra', 'Barley',
    'Barnyard Millet', 'Basmati rice', 'Browntop Millet', 'Buck Wheat',
    'Chakhao Or Black Rice', 'Chana Dal Split', 'Chana whole', 'Foxtail Millet',
    'Horse Gram', 'Jowar', 'Kabuli Chana Whole', 'Khesari Dal', 'Kodo Millet',
    'Little Millet', 'Lobia', 'Maize', 'Masoor whole', 'Moong Dal Split',
    'Moong whole', 'Moth', 'Oats Raw', 'Paddy', 'Proso Millet', 'Ragi',
    'Rajma', 'Urad Dal Split', 'Urad whole', 'Wheat', 'White Peas'
  ];

  return (
    <div className="best-price">
      <h2>Best Price Recommendations</h2>
      <div className="form-group">
        <label>Select Crop:</label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          <option value="">--Select a Crop--</option>
          {crops.map((crop, index) => (
            <option key={index} value={crop}>{crop}</option>
          ))}
        </select>
      </div>
      <button onClick={() => alert(`Fetching best prices for ${selectedCrop}`)}>
        Get Recommendations
      </button>
    </div>
  );
};

export default BestPrice;
