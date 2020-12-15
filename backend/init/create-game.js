const randomizer = require("./randomize-board");

class Game {
  constructor(room, board, playerColors) {
    this.room = room;
    this.board = board;
    this.playerColors = playerColors;
    this.gameIsPlaying = true;
    this.chipSelected = false;
    this.isFirstTurn = true
    this.selectedChip = {};
    this.action = 1;
    this.activePlayer = 'white'
    this.pathOptions = []
    this.removedChip = {}
    this.hasWon = false
    this.msg = ''
  }
}

function init(data) {
    let playerColors = determinPlayerColors()
    let board = randomizer.randomizeBoard()
    return new Game(data.room, board, playerColors)
}

function determinPlayerColors() {
  let n = Math.random()
  if (n < 0.5) {
    return ['white', 'black']
  } else {
    return ['black', 'white']
  }
}

module.exports = { init }