console.log('moving.js')

// Get board
const boardData = require('../board/board.json')

// let board = boardData

function submitMove(move) {
    console.log('in mover:' + move.x)
    // selectChip()
}

// Kan ik directe call doen naar client ipv
function submittoMove(field, x) {
      if (field.occupied == false) {
        return {isValid: false, msg: "You cannot target empty fieds"}
      } else {
        return {isValid: true, msg: ""}
        // if (field.color != activePlayer && chipSelected == false) {
        //   return {isValid: false, msg: `You cannot move ${field.colr} pieces`}
        // } else {
        //   if (chipSelected == false) {
        //     selectChip(field, x);
        //   } else {
        //     if (checkIfValidOption(field.id)) {
              
        //       if (action == 1) {
        //         firstAction(field, x);
        //       } else {
        //         secondAction(field, x);
        //       }
        //     } else {
        //       return {isValid: false, msg: "This is not a valid option"}
        //     }
        //   }
        // }
      }
    }

function selectChip() {
    console.log('second');
}
module.exports = { submitMove } 