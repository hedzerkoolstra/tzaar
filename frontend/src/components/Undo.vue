<template>
  <button class="btn" :class="{'disabled': boardStates.length < 2}" @click="undoMove()">Undo</button>
  <!-- {{boardStates}} -->
</template>

<script>
// Data
import data from "../data/board.json";
import { mapState } from 'vuex'

// Plugins
var cloneDeep = require('lodash.clonedeep');

export default {
  data() {
    return {
      boardStates: [],
      playerStates: [],
      actionStates: [],
      chipStates:[],
      board: data,
      undoingMove: false,
      actionRef: this.action
    };
  },
  computed: {
    ...mapState([
      'activePlayer',
      'action',
      'chipSelected',
      'lastBoard'
    ])
  },
  mounted() {
    // this.saveStatus()
  },
  // watch: {
  //   lastBoard: {
  //     handler: function() {
  //       this.board.data = this.$store.state.lastBoard.data;
  //       console.log('lastBoard wacther triggered')
  //     },
  //     deep: true
  //   },
  //   action: {
  //     handler: function() {
  //       if (this.undoingMove == false) {
  //         this.saveStatus()
  //         console.log('status added to undo')
  //       }
  //     },
  //     deep: true
  //   },
  // },
  methods: {
    async undoMove() {
      this.undoingMove = true
      this.boardStates.pop()
      this.playerStates.pop()
      this.actionStates.pop()
      this.chipStates.pop()
      const lastState = this.boardStates[this.boardStates.length - 1]
      const lastPlayer = this.playerStates[this.playerStates.length - 1]
      const lastAction = this.actionStates[this.actionStates.length - 1]
      const chipState = this.chipStates[this.chipStates.length - 1]
      await this.$store.commit('restoreStatus', [ lastState, lastPlayer, lastAction, chipState ])
      this.undoingMove = false
      this.$parent.$emit('resetTurn')
      console.log('boardstates:', this. boardStates)
    },
    saveStatus() {
      const savedBoard = cloneDeep(this.board)
      this.boardStates.push(savedBoard)
      console.log('boardstates:', this.boardStates)
      this.playerStates.push(this.activePlayer)
      this.actionStates.push(this.action)
      this.chipStates.push(this.chipSelected)
    }
  }
};
</script>
