// let boardData = require("../board/board.json")

class Game {
  constructor(room, board, chipSelected, isFirstTurn, selectedChip, action, activePlayer) {
    this.room = room;
    this.board = board
    this.isFirstTurn = isFirstTurn
    this.chipSelected = chipSelected;
    this.selectedChip = selectedChip;
    this.action = action;
    this.activePlayer = activePlayer;
  }
}

function init(data) {
    let startingPlayer = determinStartingPlayer()
    return new Game(data.room, data.board, true, false, {}, 1, startingPlayer)
}

function determinStartingPlayer() {
  let n = Math.random
  if (n < 0.5) {
    return 'white'
  } else {
    return 'black'
  }
}

module.exports = { init }