<template>
  <div class="board">
    <div class="board-row" v-for="row in board.data" :key="row.x">
      <button
        v-for="field in row.row"
        :key="field.id"
        @click="play(field, row.x)"
        class="board-field"
        :class="{
          transparent: field.color == 'transparent',
          empty: field.empty === true,
        }"
        :disabled="!gameIsPlaying || playerColor != activePlayer"
      >
        <div
          class="chip"
          :id="field.id"
          :class="{
            black: field.color == 'black',
            white: field.color == 'white',
            empty: field.occupied == false,
            selected: field.selected == true,
          }"
        >
          <div
            :class="{ tzarra: field.role == 'Tzarra' || field.role == 'Tzaar' }"
          >
            <div :class="{ tzaar: field.role == 'Tzaar' }"></div>
          </div>
          <!-- {{field.id}} -->
          <div class="height-indicator">
            <div>{{ field.height }}</div>
          </div>
        </div>

        <canvas width="80px" height="80px" :ref="field.id"></canvas>
      </button>
    </div>
  </div>
</template>

<script>
// Scritps
import { Pathing } from "@/mixins/pathing.js";

export default {
  mixins: [Pathing],
  props: ["pathOptions"],
  data() {
    return {
      field: "",
    };
  },
  computed: {
    board() {
      return this.$store.state.board;
    },
    gameIsPlaying() {
      return this.$store.state.gameIsPlaying
    },
    mode() {
      return this.$store.state.mode
    },
    activePlayer() {
      return this.$store.state.activePlayer
    },
    playerColor() {
      if (this.mode == 'Online PvP') {
        // console.log(this.$store.state.socket.playerCreds.color);
        return this.$store.state.socket.playerCreds.color
      } else {
        return this.$store.state.activePlayer
      }
    }
  },
  mounted: function () {
    this.styleBoard();
  },
  methods: {
    play(field, x) {
      //  this.$emit("play", field, x);
      if (this.mode == 'Online PvP') {
        this.$store.dispatch('socket/pushMove', {field: field, x: x})
      } else {
        this.$emit("play", field, x);
      }   
    },
    styleBoard() {
      this.board.data.forEach((row) => {
        row.row.forEach((element) => {
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
            ctx.strokeStyle = "rgb(233, 233, 233)";
            ctx.stroke();
          }
        });
      });
    },
  },
};
</script>

<style>

</style>