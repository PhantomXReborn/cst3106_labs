/**
 * Dice Module
 * Encapsulates the logic for rolling dice.
 * Migrated to the server for Lab 07 (client-server architecture).
 *
 * Lab 07 — CST3106
 */

const Dice = (() => {
  // ----- Private state -----
  let diceValues = [];
  let diceCount = 5;

  // ----- Private helpers -----
  function randomFace() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // ----- Public API -----
  return {
    setDiceCount(count) {
      diceCount = count;
      diceValues = new Array(count).fill(1);
    },

    getDiceCount() {
      return diceCount;
    },

    /**
     * Rolls all dice, or only the given indices.
     * @param {number[]} [indices] - indices to re-roll; omit to roll all
     * @returns {number[]} new dice values
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

    getValues() {
      return [...diceValues];
    },

    getValue(index) {
      return diceValues[index];
    },
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Dice;
}