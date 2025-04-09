import React, { useState } from 'react';
import './ProfitCalculator.css';

const ProfitCalculator = () => {
  const [crop, setCrop] = useState('');
  const [harvestMonth, setHarvestMonth] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productionCost, setProductionCost] = useState('');

  const handleCalculate = () => {
    // Placeholder logic for backend integration
    alert(`Calculating profit for ${quantity} kg of ${crop} harvested in ${harvestMonth}`);
  };

  const exportData = () => {
    const data = {
      crop,
      harvestMonth,
      quantity,
      productionCost,
    };

    const csvContent = Object.keys(data)
      .map(key => `${key},${data[key]}`)
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'profit_calculator_data.csv';
    link.click();
    alert('Data exported successfully!');
  };

  return (
    <div className="profit-calculator">
      <h2>Profit Calculator</h2>
      <div className="form-group">
        <label>Select Crop:</label>
        <input
          type="text"
          placeholder="Enter crop name"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Harvest Month:</label>
        <input
          type="text"
          placeholder="Enter harvest month"
          value={harvestMonth}
          onChange={(e) => setHarvestMonth(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Quantity (in kg):</label>
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Cost of Production (per kg):</label>
        <input
          type="number"
          placeholder="Enter production cost"
          value={productionCost}
          onChange={(e) => setProductionCost(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={handleCalculate}>Calculate Profit</button>
        <button onClick={exportData}>Export as CSV</button>
      </div>
    </div>
  );
};

export default ProfitCalculator;
