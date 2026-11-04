document.addEventListener('DOMContentLoaded', () => {
  const rollBtn = document.getElementById('rollBtn');
  const diceContainer = document.getElementById('diceContainer');
  const rollCounter = document.getElementById('rollCounter');
  const errorMessage = document.getElementById('errorMessage');

  let rollsThisTurn = 0;
  const MAX_ROLLS = 3;

  function generatePips(value) {
    let pips = '';
    for (let i = 0; i < value; i++) {
      pips += '<span class="pip"></span>';
    }
    return pips;
  }

  function updateDiceUI(values) {
    const diceElements = diceContainer.querySelectorAll('.die');

    diceElements.forEach((die, index) => {
      // Restart CSS animation
      die.classList.remove('rolling');
      void die.offsetWidth;
      die.classList.add('rolling');

      const newValue = values[index];
      die.setAttribute('data-value', newValue);
      die.innerHTML = generatePips(newValue);
    });
  }

  function getHeldIndices() {
    return [...diceContainer.querySelectorAll('.die')]
      .map((die, i) => (die.classList.contains('held') ? i : -1))
      .filter((i) => i !== -1);
  }

  async function rollDice() {
    if (rollsThisTurn >= MAX_ROLLS) return;

    // Loading state
    rollBtn.disabled = true;
    rollBtn.textContent = 'Rolling...';
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    try {
      const held = getHeldIndices();
      
      // Grab the current dice values from the DOM
      const currentValues = [...diceContainer.querySelectorAll('.die')]
        .map(die => parseInt(die.getAttribute('data-value')));

      const response = await fetch('/roll-dices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send currentValues along with held indices
        body: JSON.stringify({ held, currentValues }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Unknown error occurred');
      }

      if (!Array.isArray(data.values) || data.values.length !== 5) {
        throw new Error('Malformed response from server');
      }

      updateDiceUI(data.values);

      rollsThisTurn++;
      rollCounter.textContent = `Roll ${rollsThisTurn} of ${MAX_ROLLS}`;

      if (rollsThisTurn >= MAX_ROLLS) {
        rollBtn.textContent = 'Select Score';
        rollBtn.disabled = true;
      } else {
        rollBtn.textContent = 'Roll Dice';
        rollBtn.disabled = false;
      }
    } catch (error) {
      console.error('Error fetching dice roll:', error);
      errorMessage.textContent = `⚠️ ${error.message}. Please try again.`;
      errorMessage.style.display = 'block';
      rollBtn.textContent = 'Retry Roll';
      rollBtn.disabled = false;
    }
  }

  rollBtn.addEventListener('click', rollDice);

  // Hold / unhold a die (only after at least one roll)
  diceContainer.addEventListener('click', (e) => {
    if (rollsThisTurn === 0) return; // must roll first
    if (rollsThisTurn >= MAX_ROLLS) return; // no more rolling
    const die = e.target.closest('.die');
    if (die) die.classList.toggle('held');
  });
});