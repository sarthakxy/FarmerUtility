import React, { useEffect, useState } from 'react';
import { Chart } from 'react-charts';

const CropChart = ({ crops }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Prepare chart data from crop data
    const data = crops.map(crop => ({
      label: crop.cropName,
      data: [crop.price]
    }));
    setChartData(data);
  }, [crops]);

  return (
    <div className="chart-container">
      <Chart data={chartData} />
    </div>
  );
};

export default CropChart;