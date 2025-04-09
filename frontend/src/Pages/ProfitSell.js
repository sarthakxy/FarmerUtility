import React, { useState } from 'react';
import './ProfitSell.css'; // Style for the main page
import ProfitCalculator from '../Components/ProfitCalculator';
import BestPrice from '../Components/BestPrice';



const ProfitSell = () => {
  const [activeSection, setActiveSection] = useState(null);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'ProfitCalculator':
        return <ProfitCalculator />;
      case 'BestPrice':
        return <BestPrice />;
      
      default:
        return <p>Select a feature to get started.</p>;
    }
  };

  return (
    <div className="profit-sell-page">
      <h1>Profit Sell</h1>
      <p>Calculate the best time and maximize your profits with our advanced tools.</p>
      
      <div className="button-container">
        <button onClick={() => setActiveSection('ProfitCalculator')}>
          Profit Calculator
        </button>
        <button onClick={() => setActiveSection('BestPrice')}>
          Best Price
        </button>
        
      </div>

      <div className="feature-section">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default ProfitSell;
