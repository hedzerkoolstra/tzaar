<template>
  <div>
    <ShuffleIcon @emit-event="randomizeBoard()" :color="'white'" />
    toggle: {{ toggleBoard }}
  </div>
</template>

<script>
import ShuffleIcon from "@/components/icons/ShuffleIcon";
export default {
  components: {
    ShuffleIcon,
  },
  data() {
    return {
      randomBoard: [],
      pieceCategories: [],
      pieceCategoriesLeft: 8,
    };
  },
  computed: {
    board() {
      return this.$store.state.board.data;
    },
    toggleBoard() {
      return this.$store.state.toggleBoard;
    },
  },
  created() {
    this.$store.watch((state) => {return state.toggleBoard},
      () => {
        if (this.toggleBoard) {
          this.randomizeBoard();
          this.$store.dispatch("socket/pushAccept");
        }
      }
    );
  },
  methods: {
    randomizeBoard() {
      this.pieceCategories = [
        { color: "white", role: "Tzaar", piecesToAssign: 6 },
        { color: "white", role: "Tzarra", piecesToAssign: 9 },
        { color: "white", role: "Tott", piecesToAssign: 7 },
        { color: "white", role: "Tott", piecesToAssign: 8 },
        { color: "black", role: "Tzaar", piecesToAssign: 6 },
        { color: "black", role: "Tzarra", piecesToAssign: 9 },
        { color: "black", role: "Tott", piecesToAssign: 7 },
        { color: "black", role: "Tott", piecesToAssign: 8 },
      ];
      this.pieceCategoriesLeft = 8;
      for (let i = 0; i < this.board.length; i++) {
        const row = this.board[i];
        for (let j = 0; j < row.row.length; j++) {
          const element = row.row[j];
          if (element.empty != true) {
            this.assignPiece(element);
          }
        }
      }
    },
    assignPiece(element) {
      let newPiece = this.getRandomPiece();
      if (newPiece) {
        element.color = newPiece.color;
        element.role = newPiece.role;
      }
    },
    getRandomPiece() {
      let n = Math.round(Math.random() * (this.pieceCategoriesLeft - 1));
      let newPiece = this.pieceCategories[n];
      if (newPiece.piecesToAssign == 0) {
        this.removeCategory(n);
        if (this.pieceCategoriesLeft > 0) {
          return this.getRandomPiece();
        }
      } else {
        newPiece.piecesToAssign -= 1;
        return newPiece;
      }
    },
    removeCategory(n) {
      this.pieceCategoriesLeft -= 1;
      this.pieceCategories.splice(n, 1);
    },
  },
};
</script>

<style>
</style>