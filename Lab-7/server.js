const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON (not strictly needed for GET, but good practice)
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint: Roll 5 dice
app.get('/roll-dices', (req, res) => {
    try {
        // Generate 5 random numbers between 1 and 6
        const diceValues = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
        
        // Return the values as JSON
        res.json({ 
            success: true, 
            values: diceValues 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to roll dice on the server." 
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});