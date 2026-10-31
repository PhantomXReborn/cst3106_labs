document.addEventListener('DOMContentLoaded', () => {
    const rollBtn = document.getElementById('rollBtn');
    const diceContainer = document.getElementById('diceContainer');
    const rollCounter = document.getElementById('rollCounter');
    const errorMessage = document.getElementById('errorMessage');
    
    let rollsThisTurn = 0;
    const MAX_ROLLS = 3;

    // Helper function to generate pip HTML based on value
    function generatePips(value) {
        let pips = '';
        for (let i = 0; i < value; i++) {
            pips += '<span class="pip"></span>';
        }
        return pips;
    }

    // Function to update the DOM with new dice values
    function updateDiceUI(values) {
        const diceElements = diceContainer.querySelectorAll('.die');
        
        diceElements.forEach((die, index) => {
            // Trigger rolling animation
            die.classList.remove('rolling');
            // Void offsetWidth to restart CSS animation
            void die.offsetWidth; 
            die.classList.add('rolling');

            // Update the data-value and inner pips
            const newValue = values[index];
            die.setAttribute('data-value', newValue);
            die.innerHTML = generatePips(newValue);
            
            // Remove 'held' state if you want to reset it on new roll
            // die.classList.remove('held'); 
        });
    }

    // Function to handle the dice roll request
    async function rollDice() {
        if (rollsThisTurn >= MAX_ROLLS) return;

        // UI Updates for Loading State
        rollBtn.disabled = true;
        rollBtn.textContent = 'Rolling...';
        errorMessage.style.display = 'none';

        try {
            // Fetch data from the Express server endpoint
            const response = await fetch('/roll-dices');
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                // Update UI with values from server
                updateDiceUI(data.values);
                
                // Update roll counter
                rollsThisTurn++;
                rollCounter.textContent = `Roll ${rollsThisTurn} of ${MAX_ROLLS}`;
                
                // Disable button if max rolls reached
                if (rollsThisTurn >= MAX_ROLLS) {
                    rollBtn.textContent = 'Select Score';
                    rollBtn.disabled = true;
                } else {
                    rollBtn.textContent = 'Roll Dice';
                    rollBtn.disabled = false;
                }
            } else {
                throw new Error(data.message || 'Unknown error occurred');
            }

        } catch (error) {
            console.error('Error fetching dice roll:', error);
            // Error Handling
            errorMessage.textContent = `⚠️ ${error.message}. Please try again.`;
            errorMessage.style.display = 'block';
            rollBtn.textContent = 'Retry Roll';
            rollBtn.disabled = false;
        }
    }

    // Event Listener for Roll Button
    rollBtn.addEventListener('click', rollDice);

    // Event Listener for holding dice (from previous lab, still works)
    diceContainer.addEventListener('click', (e) => {
        const die = e.target.closest('.die');
        if (die) {
            die.classList.toggle('held');
        }
    });
});