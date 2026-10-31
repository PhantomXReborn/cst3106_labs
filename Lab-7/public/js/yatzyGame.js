/**
 * Yatzy Game Module
 * Manages the current state of the game: active player, current round,
 * total scores, and overall game flow.
 *
 * Lab 06 — CST3106
 */

const YatzyGame = (() => {
  // ----- Private state -----
  let state = {
    players: [],
    currentPlayerIndex: 0,
    currentRound: 0,           // total turns taken
    rollsThisTurn: 0,          // 0–3
    heldDice: [],              // boolean[] parallel to dice values
    running: false,
  };

  const MAX_ROUNDS_PER_PLAYER = 13;
  const MAX_ROLLS_PER_TURN = 3;

  // ----- Public API -----
  return {
    /**
     * Initializes a new game.
     * @param {string[]} [playerNames=["Player 1","Player 2"]]
     */
    startNewGame(playerNames = ["Player 1", "Player 2"]) {
      state.players = playerNames.map((name, i) => ({
        name,
        index: i,
        totalScore: 0,
      }));
      state.currentPlayerIndex = 0;
      state.currentRound = 0;
      state.rollsThisTurn = 0;
      state.heldDice = [];
      state.running = true;

      YatzyEngine.resetScoreTable();
      Dice.setDiceCount(5);
      Dice.roll();
      return { ...state };
    },

    /**
     * Returns a snapshot of the current game state.
     * @returns {Object}
     */
    getState() {
      return {
        players: state.players.map((p) => ({
          ...p,
          totalScore: YatzyEngine.getTotalScore(p.index),
        })),
        currentPlayerIndex: state.currentPlayerIndex,
        currentPlayer: state.players[state.currentPlayerIndex]?.name,
        currentRound: state.currentRound,
        rollsThisTurn: state.rollsThisTurn,
        heldDice: [...state.heldDice],
        running: state.running,
        canRoll: state.rollsThisTurn < MAX_ROLLS_PER_TURN,
        canScore: state.rollsThisTurn > 0,
      };
    },

    /**
     * Rolls the dice (only non-held dice re-roll).
     * @returns {number[]|null} dice values or null if no rolls left
     */
    rollDice() {
      if (!state.running) return null;
      if (state.rollsThisTurn >= MAX_ROLLS_PER_TURN) return null;

      // Build indices of dice NOT held
      const indicesToRoll = [];
      for (let i = 0; i < Dice.getDiceCount(); i++) {
        if (!state.heldDice[i]) indicesToRoll.push(i);
      }

      const values = Dice.roll(indicesToRoll);
      state.rollsThisTurn++;

      // Initialize heldDice array if empty
      if (state.heldDice.length !== values.length) {
        state.heldDice = new Array(values.length).fill(false);
      }

      return values;
    },

    /**
     * Toggles the held state of a die.
     * @param {number} index
     * @returns {boolean[]} the updated heldDice array
     */
    toggleHold(index) {
      if (!state.running) return state.heldDice;
      if (state.rollsThisTurn === 0) return state.heldDice; // must roll first
      if (state.heldDice.length <= index) {
        state.heldDice = new Array(Dice.getDiceCount()).fill(false);
      }
      state.heldDice[index] = !state.heldDice[index];
      return [...state.heldDice];
    },

    /**
     * Records a score for the current player in the given category and ends the turn.
     * @param {string} category
     * @returns {Object} result { success, score, message }
     */
    scoreTurn(category) {
      if (!state.running) return { success: false, message: "Game is not running." };
      if (state.rollsThisTurn === 0) return { success: false, message: "Roll at least once first." };
      if (!YatzyEngine.isValidSelection(category, Dice.getValues(), state.currentPlayerIndex)) {
        return { success: false, message: "Invalid or already-scored category." };
      }

      const diceValues = Dice.getValues();
      const score = YatzyEngine.calculateScore(category, diceValues);
      YatzyEngine.recordScore(state.currentPlayerIndex, category, score);

      this.endTurn();
      return { success: true, score, message: `Scored ${score} in ${category}.` };
    },

    /**
     * Ends the current player's turn and switches to the next player.
     * Automatically ends the game if all scorecards are complete.
     */
    endTurn() {
      const playerIndex = state.currentPlayerIndex;
      const playerName = state.players[playerIndex].name;

      // Update snapshot score
      state.players[playerIndex].totalScore = YatzyEngine.getTotalScore(playerIndex);

      // Check end condition
      const allDone = state.players.every((p) => YatzyEngine.isScorecardComplete(p.index));
      if (allDone) {
        this.endGame();
        return;
      }

      // Advance to next player
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
      state.rollsThisTurn = 0;
      state.heldDice = [];
      state.currentRound++;

      Dice.roll();
      return { previousPlayer: playerName, currentPlayer: state.players[state.currentPlayerIndex].name };
    },

    /**
     * Determines the winner and finalizes the game.
     * @returns {Object} { winner, finalScores, tie }
     */
    endGame() {
      state.running = false;

      const finalScores = state.players.map((p) => ({
        name: p.name,
        score: YatzyEngine.getTotalScore(p.index),
      }));

      const maxScore = Math.max(...finalScores.map((p) => p.score));
      const winners = finalScores.filter((p) => p.score === maxScore);

      return {
        winner: winners.length === 1 ? winners[0].name : winners.map((w) => w.name),
        finalScores,
        tie: winners.length > 1,
      };
    },
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = YatzyGame;
}