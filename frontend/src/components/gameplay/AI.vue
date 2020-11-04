<template>
  <div class="ai">
    <button @click="evaluateBoard()"></button>
    <p>
      {{ counter }} in {{ moveTime }}s met snelheid van {{ speed }} per seconde
    </p>
    <p>Turn {{ turnNumber }}</p>
  </div>
</template>

<script>
// Script
import { VirtualPathing } from "@/mixins/virtual-pathing.js";
import { VirtualGameplay } from "@/mixins/virtual-gameplay.js";

// Store
import { mapState } from "vuex";

// Plugins
var cloneDeep = require("lodash.clonedeep");

export default {
  mixins: [VirtualGameplay, VirtualPathing],
  data() {
    return {
      virtualBoard: [],
      player: "black",
      chipSelected: false,
      selectedChip: [],
      pathOptions: [],
      isMinimizing: true,
      counter: 0,
      origin: {},
      dest: {},
      moveTime: 0,
      speed: 0,
      turnNumber: 0
    };
  },
  computed: {
    ...mapState(["action", "mode", "board"]),
    initialAction() {
      if (this.action == 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    "$store.state.player": function() {
      if (this.$store.state.player == "black") {
        this.turnNumber++;
        setTimeout(() => {
          this.performAction();
        }, 500);
      }
    }
  },
  methods: {
    async performAction() {
      // console.log('TurnNumber', this.turnNumber);
      this.virtualBoard = cloneDeep(this.board);
      // console.time("getMoves");
      let allMoves = await this.getAllMoves(
        this.virtualBoard,
        this.initialAction
      );
      // console.timeEnd("getMoves");
      // console.log(allMoves);
      // console.time("getBestMove");
      var d = new Date().getTime();
      let bestMove = await this.getBestMove(allMoves);
      var d2 = new Date().getTime();
      this.moveTime = (d2 - d) / 1000;
      this.speed = (this.counter / this.moveTime).toFixed(2);

      // console.timeEnd("getBestMove");
      console.log(bestMove);
      this.firePlay(
        this.board.data[bestMove.oX].row[bestMove.oY],
        this.board.data[bestMove.oX].x
      );

      this.firePlay(
        this.board.data[bestMove.dX].row[bestMove.dY],
        this.board.data[bestMove.dX].x
      );

      if (this.$store.state.player == "black") {
        this.initialAction == false;
        setTimeout(() => {
          this.performAction();
        }, 500);
      }
    },
    async getAllMoves(board, action) {
      let availablePieces;
      availablePieces = [];
      // console.log(board)
      for (let i = 0; i < board.data.length; i++) {
        const row = board.data[i];
        for (let j = 0; j < row.row.length; j++) {
          const element = row.row[j];
          if (
            element.empty != true &&
            element.color == this.player &&
            element.occupied
          ) {
            this.pathOptions = [];
            this.determinPathOptions(board, element, row.x, action);
            for (let i = 0; i < this.pathOptions.length; i++) {
              availablePieces.push({
                origin: element,
                originX: row.x,
                dest: this.pathOptions[i].field,
                destX: this.pathOptions[i].destX
              });
            }
          }
        }
      }
      // board.data.forEach(row => {
      //   row.row.forEach(element => {

      //   });
      // });
      // console.log('availablePieces', availablePieces.length)
      return availablePieces;
    },
    async getBestMove(moves) {
      // console.log("Initial Boardvalue", this.evaluateBoard(testBoard));
      // let depth = this.setDepth();
      let depth = 5;
      console.log("depth", depth);
      let bestMove;
      let bestValue = 10000;
      for (let i = 0; i < 5; i++) {
        // console.log(moves);
        let history = await this.makeHistory(moves[i]);
        let newBoard = this.virtualBoard;
        // console.log(depth, moves[i].origin.id, moves[i].dest.id)
        await this.selectChip(
          this.virtualBoard,
          moves[i].origin,
          moves[i].originX
        );
        await this.makeMove(
          this.virtualBoard,
          moves[i].dest,
          moves[i].destX,
          this.initialAction
        );

        let virtualBoardValue = await this.minimaxRoot(
          this.virtualBoard,
          depth,
          !this.initialAction,
          this.isMinimizing,
          -10000,
          10000
        );
        // console.log('beforeUndo:')
        this.undoMove(newBoard, history);
        // console.log("Depth", 1, moves[i].origin.id, moves[i].dest.id, virtualBoard);

        if (virtualBoardValue < bestValue) {
          bestValue = virtualBoardValue;
          bestMove = {
            oX: moves[i].originX,
            oY: moves[i].origin.y,
            dX: moves[i].destX,
            dY: moves[i].dest.y
          };
        }
        this.resetBoard();
      }
      return bestMove;
    },
    async minimaxRoot(board, depth, firstAction, isMinimizing, alpha, beta) {
      // console.log("Turn Info", depth, this.player, this.isMinimizing);
      this.counter++;
      if (depth == 0) {
        return this.evaluateBoard(board);
      } else {
        // console.time('getMoves')
        let moves = await this.getAllMoves(board, firstAction);
        // console.log('numberOfMoves:', moves.length)
        let bestValue = await this.minimax(
          board,
          depth,
          moves,
          firstAction,
          isMinimizing,
          alpha,
          beta
        );

        return bestValue;
      }
    },
    async minimax(board, depth, moves, firstAction, isMinimizing, alpha, beta) {
      if (isMinimizing) {
        let bestValue = 99999;
        for (let i = 0; i < 5; i++) {
          let history = await this.makeHistory(moves[i]);

          this.selectChip(board, moves[i].origin, moves[i].originX);
          this.makeMove(board, moves[i].dest, moves[i].destX, firstAction);

          if (!firstAction) {
            this.togglePlayer();
          }

          let miniMaxValue = await this.minimaxRoot(
            board,
            depth - 1,
            !firstAction,
            isMinimizing,
            alpha,
            beta
          );

          bestValue = Math.min(bestValue, miniMaxValue);
          this.undoMove(board, history);
          beta = Math.min(beta, bestValue)
          if (beta <= alpha) {
            return bestValue
          }
        }
        return bestValue;
      } else {
        let bestValue = -99999;
        for (let i = 0; i < 5; i++) {
          let history = await this.makeHistory(moves[i]);

          this.selectChip(board, moves[i].origin, moves[i].originX);
          this.makeMove(board, moves[i].dest, moves[i].destX, firstAction);

          if (!firstAction) {
            this.togglePlayer();
          }

          let miniMaxValue = await this.minimaxRoot(
            board,
            depth - 1,
            !firstAction,
            isMinimizing,
            alpha,
            beta
          );

          bestValue = Math.max(bestValue, miniMaxValue);
          this.undoMove(board, history);
          alpha = Math.max(alpha, bestValue)
          if (beta <= alpha) {
            return bestValue
          }
        }
        return bestValue;
      }
    },
    evaluateBoard(board) {
      let virtualBoardValue = 0;
      for (let i = 0; i < board.data.length; i++) {
        const row = board.data[i].row;
        for (let i = 0; i < row.length; i++) {
          const field = row[i];
          if (field.empty != true) {
            if (field.occupied == true) {
              virtualBoardValue = virtualBoardValue + this.getValue(field);
            }
          }
        }
      }
      return virtualBoardValue;
    },
    getValue(field) {
      if (field.color == "white") {
        return this.getRoleValue(field);
      } else if (field.color == "black") {
        return -this.getRoleValue(field);
      }
    },
    getRoleValue(field) {
      if (field.role == "Tzaar") {
        return 80 * field.height * 1.3;
      } else if (field.role == "Tzarra") {
        return 40 * field.height * 1.2;
      } else if (field.role == "Tott") {
        return 20 * field.height * 1.1;
      } else {
        return 0;
      }
    },
    setDepth() {
      if (this.turnNumber < 5) {
        return 3;
      } else if (this.turnNumber < 10) {
        return 4;
      } else if (this.turnNumber < 15) {
        return 5;
      } else if (this.turnNumber < 20) {
        return 6;
      }
    },
    makeHistory(move) {
      let history = Object.assign({}, move);
      // console.log(move);
      history.origin = Object.assign({}, move.origin);
      history.dest = Object.assign({}, move.dest);
      return history;
    },
    togglePlayer() {
      if (this.player == "black") {
        this.player = "white";
      } else if (this.player == "white") {
        this.player = "black";
      }
      this.isMinimizing = !this.isMinimizing;
    },
    firePlay(field, x) {
      this.$emit("play", field, x);
    }
  }
};
</script>

<style>
</style>