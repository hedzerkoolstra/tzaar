<template>
  <div class="container">
    <Board v-if="board" />
    <div v-else class="board-placeholder"></div>

    <Panel />

    <AI @play="play" v-if="mode == 'AI'" />

  </div>
</template>

<script>
// Components
import Board from "./gameplay/Board";
import Panel from "./panel/Panel";
import AI from "./gameplay/AI";

// // // Data
// import boardData from "@/data/board.json";

// Store
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  components: {
    Board,
    Panel,
    AI,
    // Randomizer,
  },
  computed: {
    ...mapState([
      "board",
      "activePlayer",
      "action",
      "pathOptions",
      "chipSelected",
      "selectedChip",
      "isFirstTurn",
      "mode",
    ]),
    ...mapGetters("socket", [
      "playerColor",
      "opponentColor",
      "playerName",
      "opponentName",
    ]),
  },
  created() {
    const mode = window.localStorage.getItem("mode");
    this.$store.commit("SET_MODE", mode);
    this.$store.commit("SET_BOARD", this.board);
    this.$socket.connect();
  },
  sockets: {
    connect() {
      console.log("socket connected");
      if (this.mode == "Online PvP") {
        console.log('isdone');
        this.$socket.emit("pushName", this.playerName);
        this.$store.commit("socket/SET_PLAYER_CREDS", {
          name: this.playerName,
          id: this.$socket.id,
        });
      }
      this.$socket.emit("getGame", {
        board: this.boardData,
        room: this.$socket.id,
      });
    },
  },
};
</script>

<style lang="scss">
.board-placeholder {
  background-color: $board-color;
  width: 784px;
  height: 784px;
  border-radius: $edge;
}
</style>
