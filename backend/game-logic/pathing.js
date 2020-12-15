let pathOptionX;
let pathOptionY;
let selectedChip;
let pathOptions = [];
let board = [];
let action;

function determinPathOptions(gameState, chip) {
  board = gameState.board;
  action = gameState.action;
  selectedChip = chip;
  pathOptionX = chip.x;
  pathOptionY = chip.y;

  scanPath(leftUp);
  scanPath(leftDown);
  scanPath(straightUp);
  scanPath(straightDown);
  scanPath(rightUp);
  scanPath(rightDown);
  return pathOptions;
}
function scanPath(moveOneStep) {
  moveOneStep();
  let pathOption = board[pathOptionX][pathOptionY];
  if (pathOption.empty != true && pathOption.id != "510") {
    checkIfOccupied(pathOption, moveOneStep);
  } else {
    pathOptionX = selectedChip.x;
    pathOptionY = selectedChip.y;
  }
}
function checkIfOccupied(pathOption, moveOneStep) {
  if (!pathOption.occupied) {
    scanPath(moveOneStep);
  } else {
    checkIfLegalMove(pathOption);
    pathOptionX = selectedChip.x;
    pathOptionY = selectedChip.y;
  }
}
function checkIfLegalMove(pathOption) {
  if (selectedChip.color != pathOption.color 
    && selectedChip.height >= pathOption.height 
    && action == 1) {
    addOption(pathOption);
  } else if (selectedChip.height >= pathOption.height && action == 2) {
    addOption(pathOption);
  }
}
function addOption(pathOption) {
  pathOptions.push(pathOption.id);
}
function leftUp() {
  pathOptionX--;
  pathOptionY--;
}
function leftDown() {
  pathOptionX--;
  pathOptionY++;
}
function straightUp() {
  pathOptionY = pathOptionY - 2;
}
function straightDown() {
  pathOptionY = pathOptionY + 2;
}
function rightUp() {
  pathOptionX++;
  pathOptionY--;
}
function rightDown() {
  pathOptionX++;
  pathOptionY++;
}

module.exports = { determinPathOptions };
