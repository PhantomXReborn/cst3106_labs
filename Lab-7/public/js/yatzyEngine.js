/**
 * Yatzy Engine Module
 * Handles the rules and score calculation of the Yatzy game.
 * Maintains a score table for each category.
 *
 * Lab 06 — CST3106
 */

const YatzyEngine = (() => {
  // ----- Category definitions -----
  const CATEGORIES = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "threeOfAKind", "fourOfAKind", "fullHouse",
    "smallStraight", "largeStraight", "yatzy", "chance",
  ];

  const UPPER_CATEGORIES = ["ones", "twos", "threes", "fours", "fives", "sixes"];
  const UPPER_BONUS_THRESHOLD = 63;
  const UPPER_BONUS_POINTS = 35;

  // ----- Private helpers -----
  function countFaces(diceValues) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    diceValues.forEach((v) => counts[v]++);
    return counts;
  }

  function sum(diceValues) {
    return diceValues.reduce((a, b) => a + b, 0);
  }

  function isStraight(diceValues, length) {
    const unique = [...new Set(diceValues)].sort((a, b) => a - b);
    for (let i = 0; i <= unique.length - length; i++) {
      let consecutive = true;
      for (let j = 0; j < length - 1; j++) {
        if (unique[i + j + 1] !== unique[i + j] + 1) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
    return false;
  }

  // ----- Score table (per player index) -----
  // scores[playerIndex][category] = number | null
  let scores = [{}, {}];

  // ----- Public API -----
  return {
    CATEGORIES,
    UPPER_CATEGORIES,

    /**
     * Resets the score table for both players.
     */
    resetScoreTable() {
      scores = [{}, {}];
    },

    /**
     * Calculates the score for a given category based on dice values.
     * Does NOT record it.
     * @param {string} category
     * @param {number[]} diceValues
     * @returns {number}
     */
    calculateScore(category, diceValues) {
      const counts = countFaces(diceValues);
      const total = sum(diceValues);
      const values = Object.values(counts).sort((a, b) => b - a);

      switch (category) {
        case "ones":   return counts[1] * 1;
        case "twos":   return counts[2] * 2;
        case "threes": return counts[3] * 3;
        case "fours":  return counts[4] * 4;
        case "fives":  return counts[5] * 5;
        case "sixes":  return counts[6] * 6;

        case "threeOfAKind":
          return values[0] >= 3 ? total : 0;
        case "fourOfAKind":
          return values[0] >= 4 ? total : 0;
        case "fullHouse":
          return values[0] === 3 && values[1] === 2 ? 25 : 0;
        case "smallStraight":
          return isStraight(diceValues, 4) ? 30 : 0;
        case "largeStraight":
          return isStraight(diceValues, 5) ? 40 : 0;
        case "yatzy":
          return values[0] === 5 ? 50 : 0;
        case "chance":
          return total;

        default:
          return 0;
      }
    },

    /**
     * Checks if a category selection is valid for the given dice values.
     * (Category must exist and not already be scored for this player.)
     * @param {string} category
     * @param {number[]} diceValues  (unused for validity, kept for signature parity)
     * @param {number} [playerIndex=0]
     * @returns {boolean}
     */
    isValidSelection(category, diceValues, playerIndex = 0) {
      if (!CATEGORIES.includes(category)) return false;
      if (scores[playerIndex] && scores[playerIndex][category] != null) return false;
      return true;
    },

    /**
     * Records a score in the score table for a given player.
     * @param {number} playerIndex
     * @param {string} category
     * @param {number} score
     */
    recordScore(playerIndex, category, score) {
      if (!scores[playerIndex]) scores[playerIndex] = {};
      scores[playerIndex][category] = score;
    },

    /**
     * Returns the total score for a player, including upper bonus.
     * @param {number} playerIndex
     * @returns {number}
     */
    getTotalScore(playerIndex) {
      const table = scores[playerIndex] || {};
      let total = 0;
      let upperTotal = 0;

      for (const cat of CATEGORIES) {
        const val = table[cat] || 0;
        total += val;
        if (UPPER_CATEGORIES.includes(cat)) upperTotal += val;
      }

      if (upperTotal >= UPPER_BONUS_THRESHOLD) total += UPPER_BONUS_POINTS;
      return total;
    },

    /**
     * Returns the score table for a player.
     * @param {number} playerIndex
     * @returns {Object}
     */
    getScoreTable(playerIndex) {
      return { ...scores[playerIndex] };
    },

    /**
     * Returns true if all categories are filled for a player.
     * @param {number} playerIndex
     * @returns {boolean}
     */
    isScorecardComplete(playerIndex) {
      const table = scores[playerIndex] || {};
      return CATEGORIES.every((cat) => table[cat] != null);
    },
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = YatzyEngine;
}