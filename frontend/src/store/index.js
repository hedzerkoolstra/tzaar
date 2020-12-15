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
    board: undefined,
    mode: "Offline PvP", 
    toggleBoard: false,
    gameIsPlaying: false,
    chipSelected: false,
    selectedChip: {},
    action: 1,
    activePlayer: "white",
    isFirstTurn: true,
    messages: [],
    pathOptions: [],
    warning: "",
    showHelper: false,  
    popup: 'none',
    lastBoard: [],
  },
  mutations: {
    SET_GAME(state, gameState) {
      state.gameIsPlaying = gameState.gameIsPlaying
      state.board = gameState.board
      state.isFirstTurn = gameState.isFirstTurn
      state.chipSelected = gameState.chipSelected
      state.selectedChip = gameState.selectedChip
      state.activePlayer = gameState.activePlayer
      state.pathOptions = gameState.pathOptions
      state.action = gameState.action
    },
    SET_MODE: (state, data) => { state.mode = data },
    SET_BOARD: (state, board) => { state.board = board },
    RANDOMIZE_BOARD: (state, toggleBoard) => { state.toggleBoard = toggleBoard },
    SET_PLAYER_TURN: (state, color) => {state.activePlayer = color},
    SET_GAME_PLAYING: (state, isPlaying) => {state.gameIsPlaying = isPlaying},
    TOGGLE_HELPER: (state) => { state.showHelper = !state.showHelper },
    ADD_PATH_OPTION: (state, option) => {state.pathOptions.push(option)},
    EMPTY_PATH_OPTIONS: (state, array) => {state.pathOptions = array},
    SET_IS_FIRST_TURN: (state, boolean) => {state.isFirstTurn = boolean},
    SET_ACTION_NUMBER: (state, actionNumber) => {state.action = actionNumber},
    SET_CHIP_SELECTED: (state, boolean) => { state.chipSelected = boolean },
    SET_WARNING: (state, warning) => {state.warning = warning},
    SET_POPUP: (state, status) => { state.popup = status},
    ADD_MESSAGE(state, msg) { 
      state.messages.push(msg)
      state.warning = ""
    },
    CHANGE_PLAYER(state) {
      if (state.activePlayer == "black") {
        state.activePlayer = "white";
      } else if (state.activePlayer == "white") {
        state.activePlayer = "black";
      }
    }
  },
});
