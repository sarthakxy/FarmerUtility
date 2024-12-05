const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database setup
const db = new sqlite3.Database('./farmerUtility.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite Database');
    }
});

// Crop APIs
app.get('/crops', (req, res) => {
    db.all('SELECT * FROM Crops', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.post('/crops', (req, res) => {
    const { cropName, price } = req.body;
    db.run(`INSERT INTO Crops (cropName, price, dateUpdated) VALUES (?, ?, ?)`,
           [cropName, price, new Date().toISOString()], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Delete Crop
app.delete('/crops/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM Crops WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(`Crop with ID ${id} deleted.`);
        }
    });
});

// Update Crop Price
app.put('/crops/:id', (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    db.run(`UPDATE Crops SET price = ?, dateUpdated = ? WHERE id = ?`,
           [price, new Date().toISOString(), id], function (err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(`Crop with ID ${id} updated.`);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
