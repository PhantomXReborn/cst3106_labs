const express = require('express');
const path = require('path');
const Dice = require('./dice');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /roll-dices — rolls all five dice (kept for backward compatibility)
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

// POST /roll-dices — rolls only non-held dice
// Body: { held: [0, 2] }  (indices of dice to keep)
app.post('/roll-dices', (req, res) => {
  try {
    const held = Array.isArray(req.body.held) ? req.body.held : [];
    const validHeld = held.filter(i => Number.isInteger(i) && i >= 0 && i < 5);

    Dice.setDiceCount(5);

    let values;
    if (validHeld.length === 0) {
      values = Dice.roll(); // roll all
    } else {
      const toRoll = [0, 1, 2, 3, 4].filter(i => !validHeld.includes(i));
      // If every die is held, just return current values
      values = toRoll.length === 0 ? Dice.getValues() : Dice.roll(toRoll);
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