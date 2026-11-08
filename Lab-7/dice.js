/**
 * Dice Module (Server-Side)
 * Lab 07 — CST3106
 */

const Dice = (() => {
  let diceValues = [];
  let diceCount = 5;

  function randomFace() {
    return Math.floor(Math.random() * 6) + 1;
  }

  return {
    setDiceCount(count) {
      diceCount = count;
      diceValues = new Array(count).fill(1);
    },

    getDiceCount() {
      return diceCount;
    },

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