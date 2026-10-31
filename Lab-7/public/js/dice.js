/**
 * Dice Module
 * Encapsulates the logic for rolling dice.
 * Tracks the number of dice and their current values.
 *
 * Lab 06 — CST3106
 */

const Dice = (() => {
  // ----- Private state -----
  let diceValues = [];
  let diceCount = 5;

  // ----- Private helpers -----
  /**
   * Returns a random integer between 1 and 6 (inclusive).
   */
  function randomFace() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // ----- Public API -----
  return {
    /**
     * Sets how many dice the module manages.
     * @param {number} count
     */
    setDiceCount(count) {
      diceCount = count;
      diceValues = new Array(count).fill(1);
    },

    /**
     * Returns the current number of dice.
     * @returns {number}
     */
    getDiceCount() {
      return diceCount;
    },

    /**
     * Rolls all dice (or only the indices provided).
     * @param {number[]} [indices] - optional indices to re-roll (held dice are excluded)
     * @returns {number[]} the new dice values
     */
    roll(indices = null) {
      if (diceValues.length !== diceCount) {
        diceValues = new Array(diceCount).fill(1);
      }

      if (Array.isArray(indices) && indices.length > 0) {
        indices.forEach((i) => {
          if (i >= 0 && i < diceCount) diceValues[i] = randomFace();
        });
      } else {
        diceValues = diceValues.map(() => randomFace());
      }

      return [...diceValues];
    },

    /**
     * Returns a copy of the current dice values.
     * @returns {number[]}
     */
    getValues() {
      return [...diceValues];
    },

    /**
     * Returns a single die value by index.
     * @param {number} index
     * @returns {number}
     */
    getValue(index) {
      return diceValues[index];
    },
  };
})();

// Export for use in other modules (Node / ES module environments)
if (typeof module !== "undefined" && module.exports) {
  module.exports = Dice;
}