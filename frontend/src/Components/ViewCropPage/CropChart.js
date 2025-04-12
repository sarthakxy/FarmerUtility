// CropChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const generateRandomPrices = (count) => (
    Array.from({ length: count }, () => Math.floor(Math.random() * (2500 - 1200 + 1)) + 1200)
);

const CropChart = ({ crop }) => {
    const weeklyPrices = generateRandomPrices(7);
    const monthlyPrices = generateRandomPrices(12);

    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: `${crop} Weekly Price`,
            data: weeklyPrices,
            borderColor: '#4CAF50',
            fill: false,
        }]
    };

    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: `${crop} Monthly Price`,
            data: monthlyPrices,
            borderColor: '#2196F3',
            fill: false,
        }]
    };

    return (
        <div className="chart-section">
            <h3>📈 Price Trends</h3>
            <div className="chart-container">
                <Line data={weeklyData} />
            </div>
            <div className="chart-container">
                <Line data={monthlyData} />
            </div>
        </div>
    );
};

export default CropChart;
