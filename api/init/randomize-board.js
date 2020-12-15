const boardData = require('../board/board.json') 
let chipCatogories = [];
let chipCatogoriesLeft = 8;

function randomizeBoard() {
  resetData();
  let boardCopy = JSON.parse(JSON.stringify(boardData));

  let board = boardCopy.map(col => {
    return col.map(field => {
      if (field.empty != true && field.id != 510) {
       field = assignRandomChip(field);
      }
      return field
    });
  });
  return board
}

function assignRandomChip(field) {
  let newChip = getRandomChip();
  if (newChip) {
    field.color = newChip.color;
    field.role = newChip.role;
  }
  return field
}

function getRandomChip() {
  let categoryNumber = Math.round(Math.random() * (chipCatogoriesLeft - 1));
  let newChip = chipCatogories[categoryNumber];
  if (newChip.piecesToAssign == 0) {
    removeCategory(categoryNumber);
    if (chipCatogoriesLeft > 0) {
      return getRandomChip();
    }
  } else {
    newChip.piecesToAssign -= 1;
    return newChip;
  }
}

function removeCategory(categoryNumber) {
  chipCatogoriesLeft -= 1;
  chipCatogories.splice(categoryNumber, 1);
}

function resetData() {
  chipCatogories = [
    { color: "white", role: "Tzaar", piecesToAssign: 6 },
    { color: "white", role: "Tzarra", piecesToAssign: 9 },
    { color: "white", role: "Tott", piecesToAssign: 7 },
    { color: "white", role: "Tott", piecesToAssign: 8 },
    { color: "black", role: "Tzaar", piecesToAssign: 6 },
    { color: "black", role: "Tzarra", piecesToAssign: 9 },
    { color: "black", role: "Tott", piecesToAssign: 7 },
    { color: "black", role: "Tott", piecesToAssign: 8 },
  ];
  chipCatogoriesLeft = 8;
}

module.exports = { randomizeBoard }