<template>
  <div class="container">
    <div class="game">
     
      <Board
        :gameWon="gameWon"
        :pathOptions="pathOptions"
        @play="play"
        @deselectChip="deselectChip"
      />

       <Panel
        @switchTurn="switchTurn"
        @deselectChip="deselectChip"
        @resetTurn="resetTurn"
        :message="message"
      />
    </div>
    <randomize-board>
      
    </randomize-board>
    <AI @play='play' v-if="mode == 'AI'"/>
    <Socket  v-if="mode == 'Online PvP'" />
  </div>
</template>

<script>
// Components
import Board from "./gameplay/Board";
import Panel from "./panel/Panel";
import AI from "./gameplay/AI";
import Randomizer from "./gameplay/Randomizer";
import Socket from "./Socket";
// import Socket from "./Socket";


// Scripts
import { Pathing } from '../mixins/pathing.js'
import { CheckWin } from '../mixins/check-win.js'
import { Gameplay } from '../mixins/gameplay.js'


// Data
import boardData from "@/data/board.json";

// Store
import { mapState } from 'vuex'

export default {
  components: {
    Board,
    Panel,
    AI,
    Socket,
    'randomize-board': Randomizer
  },
  mixins: [ Pathing, CheckWin, Gameplay ],
  data() {
    return {
      board: boardData,
      message: "Select Chip To Start",
      selectedChip: this.$store.state.selectedChip,
      pathOptions: [],
      optionStore: [],
      checkedX: "",
      checkedY: "",
      checkedColor: "",
      checkedHeight: "",
      jacksAlive: true,
      queensAlive: true,
      kingsAlive: true,
      movesPossible: true,
      checkingWin: false,
      gameWon: false
    };
  },
  computed: {
    ...mapState([
      'player',
      'action',
      'chipSelected',
      'mode'
    ])
  },
  created() {
    const mode = window.localStorage.getItem('mode')
    this.$store.commit("SET_MODE", mode)
    this.$store.commit("SET_BOARD", this.board)
  }
};
</script>

<style>
</style>
