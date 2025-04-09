const express = require('express');
const axios = require('axios'); // Import axios for external API calls

const router = express.Router();

// Route to fetch crop data based on filters
router.get('/', async (req, res) => {
    const { priceArrivals, crop, state, district, fromDate, toDate, sort } = req.query; // Extract query parameters

    try {
        // Validate required parameters
        if (!priceArrivals || !crop || !state || !district) {
            return res.status(400).json({ message: 'Missing required query parameters' });
        }

        // Fetch crop prices from external API
        let externalData = [];
        try {
            const response = await axios.get('https://api.example.com/get-crop-prices', { // Replace with your chosen API endpoint
                params: { crop, state, district },
            });
            externalData = response.data; // Assume the API returns an array of data
        } catch (apiError) {
            console.error('Error fetching external crop prices:', apiError.message);
            return res.status(500).json({ message: 'Failed to fetch crop data from external API', error: apiError.message });
        }

        // Check if external data is available
        if (!externalData.length) {
            return res.status(404).json({ message: 'No crops found for the selected filters from external API' });
        }

        // Sorting logic based on query
        if (sort === 'priceHigh') {
            externalData.sort((a, b) => b.price - a.price); // Sort by highest price
        } else if (sort === 'priceLow') {
            externalData.sort((a, b) => a.price - b.price); // Sort by lowest price
        } else if (sort === 'date') {
            externalData.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by earliest date
        }

        // Calculate average price if the filter is "Price"
        if (priceArrivals === 'Price') {
            const total = externalData.reduce((sum, crop) => sum + crop.price, 0);
            const averagePrice = (total / externalData.length).toFixed(2);
            return res.json({
                message: 'Crops found',
                averagePrice,
                totalCrops: externalData.length,
                crops: externalData,
            });
        }

        // Return crop arrival data
        if (priceArrivals === 'Arrivals') {
            const totalArrivals = externalData.reduce((sum, crop) => sum + crop.arrivals, 0);
            return res.json({
                message: 'Crop arrivals found',
                totalArrivals,
                totalRecords: externalData.length,
                crops: externalData,
            });
        }

        // Fallback response for unexpected cases
        return res.status(400).json({ message: 'Invalid filter selection' });
    } catch (error) {
        console.error('Error fetching crop data:', error.message);
        res.status(500).json({ message: 'Failed to fetch crop data', error });
    }
});

module.exports = router;
