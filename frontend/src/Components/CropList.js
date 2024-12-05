import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CropList = () => {
    const [crops, setCrops] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/crops')
            .then(response => setCrops(response.data))
            .catch(error => console.error('Error fetching crops:', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/crops/${id}`)
            .then(() => {
                alert('Crop deleted successfully!');
                setCrops(crops.filter(crop => crop.id !== id));
            })
            .catch(error => console.error('Error deleting crop:', error));
    };

    const handleUpdate = (id) => {
        axios.put(`http://localhost:3000/crops/${id}`, { price: newPrice })
            .then(() => {
                alert('Crop updated successfully!');
                setCrops(crops.map(crop => crop.id === id ? { ...crop, price: newPrice } : crop));
                setEditingId(null);
            })
            .catch(error => console.error('Error updating crop:', error));
    };

    return (
        <div>
            <h2>Crop Prices</h2>
            <ul>
                {crops.map(crop => (
                    <li key={crop.id}>
                        <span>{crop.cropName} - ${crop.price}</span>
                        <button onClick={() => handleDelete(crop.id)}>Delete</button>
                        <button onClick={() => setEditingId(crop.id)}>Update</button>

                        {editingId === crop.id && (
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(crop.id); }}>
                                <input
                                    type="number"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    placeholder="New Price"
                                />
                                <button type="submit">Save</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CropList;
