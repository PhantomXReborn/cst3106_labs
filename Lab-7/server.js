const express = require('express');
const path = require('path');
const Dice = require('./dice');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /roll-dices — rolls all five dice
app.get('/roll-dices', (req, res) => {
  try {
    Dice.setDiceCount(5);
    const values = Dice.roll();
    res.json({ success: true, values });
  } catch (err) {
    console.error('Roll failed:', err);
    res.status(500).json({ success: false, message: 'Failed to roll dice on the server.' });
  }
});

// POST /roll-dices — rolls only non-held dice, preserving held values
// Body: { held: [0, 2], currentValues: [3, 4, 5, 1, 2] }
app.post('/roll-dices', (req, res) => {
  try {
    const held = Array.isArray(req.body.held) ? req.body.held : [];
    const currentValues = Array.isArray(req.body.currentValues) ? req.body.currentValues : [];
    const validHeld = held.filter(i => Number.isInteger(i) && i >= 0 && i < 5);

    Dice.setDiceCount(5);

    let values;
    if (validHeld.length === 0) {
      // No dice held, roll all
      values = Dice.roll();
    } else {
      // Roll all to generate new numbers
      const newRolls = Dice.roll();
      
      // Map through indices: use current value if held, otherwise use new roll
      values = [0, 1, 2, 3, 4].map(index => {
        if (validHeld.includes(index) && currentValues[index]) {
          return currentValues[index];
        }
        return newRolls[index];
      });
    }

    res.json({ success: true, values });
  } catch (err) {
    console.error('Roll failed:', err);
    res.status(500).json({ success: false, message: 'Failed to roll dice on the server.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});