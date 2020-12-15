const pathing = require('./pathing');
const winner = require('./winner');

// Variables
let state = {};
let targetedChip = {};
let moveValidation

function submitMove(chip, gameState) {
  state = gameState
  targetedChip = state.board[chip.x][chip.y]

  if (!targetedChip.occupied) {
    moveValidation = { isValid: false, msg: "You cannot target empty fieds" };
  } else {
    if (state.chipSelected == false && targetedChip.color != state.activePlayer) {
      moveValidation = { isValid: false, msg: `You cannot move ${targetedChip.color} pieces` };
    } else {
      if (state.chipSelected == false) {
        selectChip(targetedChip);
      } else {
        if (state.pathOptions.includes(targetedChip.id)) {
          if (state.action == 1) {
            firstAction(targetedChip);
          } else {
            secondAction(targetedChip);
          }
        } else {
          moveValidation = { isValid: false, msg: "This is not a valid option" };
        }
      }
    }
  }
  return moveValidation
}

function selectChip(targetedChip) {
  state.selectedChip = targetedChip;
  state.selectedChip.selected = true;
  state.chipSelected = true;
  state.msg = '';
  state.pathOptions = pathing.determinPathOptions(state, targetedChip);
  if (state.isFirstTurn) {
    state.gameIsPlaying = true
  }
  moveValidation = { isValid: true, gameState: state}
}

function firstAction(targetedChip) {
  if (targetedChip.color == state.selectedChip.color) {
    moveValidation = { isValid: false, msg: "You have to attack first" };
  } else {
    attackPlayer(targetedChip);
  }
}
function secondAction(targetedChip) {
  if (targetedChip.color == state.selectedChip.color) {
    stackTower(targetedChip);
  } else {
    attackPlayer(targetedChip);
  }
}
////////////////////////////////////
// Actions
function attackPlayer(targetedChip) {
  if (state.selectedChip.height < targetedChip.height) {
    moveValidation = { isValid: false, msg: "You can't attack higher towers" };
  } else {
    state.removedChip = Object.assign({}, targetedChip)
    state.msg = `${state.selectedChip.color} Attacked Enemy ${targetedChip.role}`;

    targetedChip.role = state.selectedChip.role;
    targetedChip.color = state.selectedChip.color;
    targetedChip.height = state.selectedChip.height;
    state.board[state.selectedChip.x][state.selectedChip.y].occupied = false;
    state.hasWon = winner.checkWin(state);
    if (state.isFirstTurn) {
      state.isFirstTurn = false
      switchTurn();
    } else {
      if (state.action == 1) {
        resetTurn();
        state.action = 2
      } else {
        switchTurn();
      }
    }
  }
}
function stackTower(targetedChip) {
  state.removedChip = Object.assign({}, targetedChip)
  let newHeight = targetedChip.height + state.selectedChip.height;
  targetedChip.height = newHeight;
  targetedChip.role = state.selectedChip.role;
  state.board[state.selectedChip.x][state.selectedChip.y].occupied = false;
  state.msg = `${state.selectedChip.color} ${targetedChip.role} stacked to ${newHeight}`;

  switchTurn();
}
////////////////////////////////////
// Utility Functions
function switchTurn() {
  state.hasWon = winner.checkWin(state);
  if (state.activePlayer == 'white') {
    state.activePlayer = 'black'
  } else {
    state.activePlayer = 'white'
  }
  state.action = 1
  resetTurn();
}
function resetTurn() {
  state.chipSelected = false
  state.pathOptions.length = 0;
  if (state.hasWon) {
    state.msg = `${state.selectedChip.color} has won!`
  } 
  moveValidation = { isValid: true, gameState: state}
}

function deselectChip() {
  state.selectedChip.occupied = true;
  state.selectedChip.selected = false;
  resetTurn();
  return moveValidation
}

function passTurn() {
  state.selectedChip.occupied = true;
  state.selectedChip.selected = false;
  state.msg = ''
  switchTurn()
  return moveValidation
}

module.exports = { submitMove, deselectChip, passTurn };
