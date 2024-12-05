import React, { useState } from 'react';

function Prediction() {
    const [crop, setCrop] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = () => {
        fetch(`/api/predict-price?crop=${crop}`)
            .then(response => response.json())
            .then(data => setPrediction(data.predictedPrice))
            .catch(error => console.error('Error with prediction:', error));
    };

    return (
        <div className="prediction">
            <h2>Predict Crop Prices</h2>
            <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="Enter crop name"
            />
            <button onClick={handlePredict}>Predict Price</button>
            {prediction && <p>Predicted Price: ${prediction}</p>}
        </div>
    );
}

export default Prediction;
