const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./farmerUtility.db');

db.serialize(() => {
    // Create Crops Table
    db.run(`
        CREATE TABLE IF NOT EXISTS Crops (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cropName TEXT NOT NULL,
            price REAL NOT NULL,
            dateUpdated TEXT NOT NULL
        )
    `);

    // Create Farmers Table
    db.run(`
        CREATE TABLE IF NOT EXISTS Farmers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            contact TEXT NOT NULL,
            outstandingBalance REAL NOT NULL
        )
    `);

    // Create Transactions Table
    db.run(`
        CREATE TABLE IF NOT EXISTS Transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmerId INTEGER,
            amount REAL NOT NULL,
            type TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (farmerId) REFERENCES Farmers(id)
        )
    `);
});

db.close();
