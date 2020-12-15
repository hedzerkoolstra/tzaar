
const pathing = require('./pathing');

let colorToCheck;
let tottsAlive = false;
let tzarrasAlive = false;
let tzaarsAlive = false;
let movesPossible = false;
let state

function checkWin(gameState) {
  state = gameState
  tottsAlive = false;
  tzarrasAlive = false;
  tzaarsAlive = false;
  movesPossible = false;
  colorToCheck = gameState.activePlayer == "white" ? "black" : "white";

  state.board.forEach((col) => {
    col.forEach((element) => {
      checkIfRoleIsAlive(element);

      if (state.action == 2) {
        checkIfPlayerCanMove(element);
      }
    });
  });
  if (tzaarsAlive == false || tzarrasAlive == false || tottsAlive == false) {
    return true;
  } else if (state.action == 2 && movesPossible == false) {
    return true;
  } else {
    return false;
  }
}

function checkIfRoleIsAlive(element) {
  if (element.color == colorToCheck) {
    if (element.occupied == true) {
      if (element.role == "Tzaar") {
        tzaarsAlive = true;
      } else if (element.role == "Tzarra") {
        tzarrasAlive = true;
      } else if (element.role == "Tott") {
        tottsAlive = true;
      }
    }
  }
}

function checkIfPlayerCanMove(element) {
  if (element.empty != true && element.color == colorToCheck) {
    let options = pathing.determinPathOptions(state, element);
    if (options.length != 0) {
      movesPossible = true;
    }
  }
}

module.exports = { checkWin };
