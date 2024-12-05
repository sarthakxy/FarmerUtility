// CropPrices.js
import React, { useState } from 'react';
import './CropPrices.css';

// Crop options
const crops = [
    'Rice', 'Amaranth Seed', 'Arhar', 'Arhar Dal Split', 'Bajra', 'Barley', 'Barnyard Millet', 
    'Basmati rice', 'Browntop Millet', 'Buck Wheat', 'Chakhao Or Black Rice', 'Chana Dal Split', 
    'Chana whole', 'Foxtail Millet', 'Horse Gram', 'Jowar', 'Kabuli Chana Whole', 'Khesari Dal', 
    'Kodo Millet', 'Little Millet', 'Lobia', 'Maize', 'Masoor whole', 'Moong Dal Split', 'Moong whole', 
    'Moth', 'Oats Raw', 'Paddy', 'Proso Millet', 'Ragi', 'Rajma', 'Urad Dal Split', 'Urad whole', 
    'Wheat', 'White Peas'
];

// State options
const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 
    'West Bengal'
];

// District options
const districts = [
    'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 
    'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 
    'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 
    'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddh Nagar', 'Ghaziabad', 
    'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 
    'Jhansi', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 
    'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 
    'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 
    'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Sant Ravidas Nagar', 'Shahjahanpur', 
    'Shamli', 'Shravasti', 'Sidharth Nagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 
    'Varanasi'
];

const CropPrices = () => {
    const [priceArrivals, setPriceArrivals] = useState('');
    const [crop, setCrop] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleSearch = () => {
        // Handle search logic here, such as API call with selected filters
        console.log({
            priceArrivals,
            crop,
            state,
            district,
            fromDate: priceArrivals === 'Arrivals' ? fromDate : undefined,
            toDate: priceArrivals === 'Arrivals' ? toDate : undefined,
        });
    };

    return (
        <div className="crop-prices">
            <h2>Real-Time Crop Prices</h2>
            <div className="filter-container">
                <div className="dropdown">
                    <label>Price/Arrivals</label>
                    <select value={priceArrivals} onChange={(e) => setPriceArrivals(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Price">Price</option>
                        <option value="Arrivals">Arrivals</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label>Crop</label>
                    <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                        <option value="">Select</option>
                        {crops.map((crop, index) => (
                            <option key={index} value={crop}>{crop}</option>
                        ))}
                    </select>
                </div>
                <div className="dropdown">
                    <label>State</label>
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="">Select</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="dropdown">
                    <label>District</label>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option value="">Select</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                {priceArrivals === 'Arrivals' && (
                    <>
                        <div className="dropdown">
                            <label>From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                min="1900-01-01" // Earliest date selectable
                                max="2099-12-31" // Latest date selectable
                                className="date-input"
                            />
                        </div>
                        <div className="dropdown">
                            <label>To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                min="1900-01-01" // Earliest date selectable
                                max="2099-12-31" // Latest date selectable
                                className="date-input"
                            />
                        </div>
                    </>
                )}
                <button onClick={handleSearch} className="search-button">Go</button>
            </div>
            <ul>
                {/* Display crop prices here */}
            </ul>
        </div>
    );
};

export default CropPrices;
