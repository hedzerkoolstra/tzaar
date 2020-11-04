import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import panel from "./modules/panel.js"

export default new Vuex.Store({
  modules: {
    panel,
  },
  state: {
    playerName: undefined,
    mode: "Offline PvP",
    showHelper: false,
    selectedChip: {},
    lastBoard: [],
    action: 1,
    player: "white",
    chipSelected: false,
    messages: [],
    warning: "",
    board: {},
  },
  mutations: {
    SET_MODE: (state, data) => { state.mode = data },
    SET_BOARD: (state, board) => { state.board = board },
    SET_PLAYER_NAME: (state, name) => {state.playerName = name },
    SET_WARNING: (state, warning) => {state.warning = warning},
    ADD_MESSAGE(state, msg) { 
      state.messages.push(msg)
      state.warning = ""
    },
    toggleHelper(state) {
      state.showHelper = !state.showHelper;
    },
    restoreStatus(state, [board, player, action, chipState]) {
      state.lastBoard = board;
      state.player = player;
      state.action = action;
      state.chipSelected = chipState;
    },
    changePlayer(state) {
      if (state.player == "black") {
        state.player = "white";
      } else if (state.player == "white") {
        state.player = "black";
      }
    },
    changeAction(state, actionState) {
      state.action = actionState;
    },
    chipSelected(state, boolean) {
      state.chipSelected = boolean;
    },
  },
});
