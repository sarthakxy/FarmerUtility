import React, { useState } from 'react';
import axios from 'axios';

const AddCrop = () => {
    const [cropName, setCropName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/crops', { cropName, price })
            .then(() => {
                alert('Crop added successfully!');
                setCropName('');
                setPrice('');
            })
            .catch((error) => console.error('Error adding crop:', error));
    };

    return (
        <form className="crop-form" onSubmit={handleSubmit}>
            <h2>Add New Crop</h2>
            <label>
                Crop Name:
                <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    required
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Add Crop</button>
        </form>
    );
};

export default AddCrop;
