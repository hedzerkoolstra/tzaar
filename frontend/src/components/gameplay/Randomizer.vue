<template>
  <div>
    <ShuffleIcon
      @emit-event="randomizeBoard()"
      :color="'white'"
      v-if="showIcon"
    />
    <!-- :class="{ disabled: gameIsPlaying }" -->
  </div>
</template>

<script>
import ShuffleIcon from "@/components/buttons/ShuffleIcon";

export default {
  components: {
    ShuffleIcon,
  },
  props: {
    showIcon: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      randomBoard: [],
      chipCatogories: [],
      chipCatogoriesLeft: 8,
    };
  },
  computed: {
    board() {
      return this.$store.state.board.data;
    },
    toggleBoard() {
      return this.$store.state.toggleBoard;
    },
    showHelper() {
      return this.$store.state.showHelper;
    },
    gameIsPlaying() {
      return this.$store.state.gameIsPlaying;
    },
  },
  created() {
    this.$store.watch(
      (state) => {
        return state.toggleBoard;
      },
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
      this.resetData();

      this.board.forEach((col) => {
        col.forEach((field) => {
          if (field.empty != true && field.id != 510) {
            this.assignRandomChip(field);
          }
        });
      });
    },
    assignRandomChip(field) {
      let newPiece = this.getRandomChip();
      if (newPiece) {
        field.color = newPiece.color;
        field.role = newPiece.role;
      }
    },
    getRandomChip() {
      let categoryNumber = Math.round(
        Math.random() * (this.chipCatogoriesLeft - 1)
      );
      let newPiece = this.chipCatogories[categoryNumber];
      if (newPiece.piecesToAssign == 0) {
        this.removeCategory(categoryNumber);
        if (this.chipCatogoriesLeft > 0) {
          return this.getRandomChip();
        }
      } else {
        newPiece.piecesToAssign -= 1;
        return newPiece;
      }
    },
    removeCategory(categoryNumber) {
      this.chipCatogoriesLeft -= 1;
      this.chipCatogories.splice(categoryNumber, 1);
    },
    resetData() {
      this.chipCatogories = [
        { color: "white", role: "Tzaar", piecesToAssign: 6 },
        { color: "white", role: "Tzarra", piecesToAssign: 9 },
        { color: "white", role: "Tott", piecesToAssign: 7 },
        { color: "white", role: "Tott", piecesToAssign: 8 },
        { color: "black", role: "Tzaar", piecesToAssign: 6 },
        { color: "black", role: "Tzarra", piecesToAssign: 9 },
        { color: "black", role: "Tott", piecesToAssign: 7 },
        { color: "black", role: "Tott", piecesToAssign: 8 },
      ];

      this.chipCatogoriesLeft = 8;
    },
  },
};
</script>

<style>
</style>