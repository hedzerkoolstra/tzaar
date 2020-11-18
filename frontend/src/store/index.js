import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import panel from "./modules/panel.js"
import socket from "./modules/socket.js"

export default new Vuex.Store({
  modules: {
    panel,
    socket
  },
  state: {
    board: {},
    playerName: undefined,
    mode: "Offline PvP", 
    toggleBoard: false,
    gameIsPlaying: true,
    // Game State 
    chipSelected: false,
    selectedChip: {},
    action: 1,
    activePlayer: "white",
    isFirstTurn: true,
    // To panel
    messages: [],
    warning: "",
    showHelper: false,  
    // Undo
    lastBoard: [],
  },
  mutations: {
    SET_MODE: (state, data) => { state.mode = data },
    SET_BOARD: (state, board) => { state.board = board },
    SET_PLAYER_NAME: (state, name) => {state.playerName = name },
    SET_WARNING: (state, warning) => {state.warning = warning},
    FIRST_TURN: (state, boolean) => {state.isFirstTurn = boolean},
    RANDOMIZE_BOARD: (state, toggleBoard) => { state.toggleBoard = toggleBoard },
    SET_PLAYER_TURN: (state, color) => {state.activePlayer = color},
    GAME_IS_PLAYING: (state, isPlaying) => {state.gameIsPlaying = isPlaying},
    ADD_MESSAGE(state, msg) { 
      state.messages.push(msg)
      state.warning = ""
    },
    // @Hedzer, dit moet naar /socket
    SET_GAME(state, game) {
      console.log(game.board);
      state.board = game.board
      state.isFirstTurn = game.isFirstTurn
      state.chipSelected = game.chipSelected
      state.selectedChip = game.selectedChip
      state.action = game.action
      state.activePlayer = game.activePlayer
    },
    toggleHelper(state) {
      state.showHelper = !state.showHelper;
    },
    restoreStatus(state, [board, activePlayer, action, chipState]) {
      state.lastBoard = board;
      state.activePlayer = activePlayer;
      state.action = action;
      state.chipSelected = chipState;
    },
    changePlayer(state) {
      if (state.activePlayer == "black") {
        state.activePlayer = "white";
      } else if (state.activePlayer == "white") {
        state.activePlayer = "black";
      }
    },
    changeAction(state, actionState) {
      state.action = actionState;
    },
    chipSelected(state, boolean) {
      state.chipSelected = boolean;
    },
  },
  actions: {
    setPlayerName( {commit, state}, name ) {
      commit('SET_PLAYER_NAME', name)
      if (state.mode == 'OnlinePvP') {
        console.log('online');
      }
    }
  }
});
