<template>
  <div class="board">
    <div class="board-row" v-for="(col, i) in board" :key="i">
      <button
        v-for="field in col"
        :key="field.id"
        @click="play(field)"
        class="board-field"
        :class="{
          transparent: field.color == 'transparent',
          empty: field.empty === true,
        }"
        :disabled="disable"
      >
        <Chip :field="field" />
        <canvas width="80px" height="80px" :ref="field.id"></canvas>

      </button>
     
    </div>
  </div>
</template>

<script>
// Scritps
import Chip from "./Chip";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  components: { Chip },
  computed: {
    ...mapState([
      "board",
      "gameIsPlaying",
      "mode",
      "activePlayer",
      "selectedChip",
      "action",
    ]),
    ...mapGetters('socket', [
      "playerColor",
    ]),
    disable() {
      if (!this.gameIsPlaying) {
        return true
      } else if (this.mode == 'Online PvP' && this.playerColor != this.activePlayer) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.styleBoard();
  },
  methods: {
    play(targetedChip) {
      this.$store.dispatch("socket/pushMove", targetedChip);
    },
    styleBoard() {
      console.log('board ' + JSON.stringify(this.board));
      this.board.forEach((col) => {
        col.forEach((element) => {
          console.log(element);
          if (element.empty != true) {
            var canvas = this.$refs[element.id][0];
            var ctx = canvas.getContext("2d");
            ctx.moveTo(40, 0);
            ctx.lineTo(40, 80);
            ctx.stroke();
            ctx.moveTo(0, 60);
            ctx.lineTo(80, 20);
            ctx.stroke();
            ctx.moveTo(0, 20);
            ctx.lineTo(80, 60);
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(31,31,31)";
            ctx.stroke();
          }
        });
      });
    }
  }
};
</script>