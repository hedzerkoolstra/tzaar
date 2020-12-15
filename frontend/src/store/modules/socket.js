const state = {
  move: {},
  room: undefined,
  players: [],
  io: {},
  movePending: false,
  playerCreds: {name: undefined, id: undefined, color: undefined},
  opponentCreds: {name: undefined, id: undefined, color: undefined}
};

const getters = {
  playerName: (state) => {
    return state.playerCreds.name
  },
  opponentName: (state, getters, rootState) => {
    if (rootState.mode == 'Online PvP' && state.opponentCreds.name) {
      return state.opponentCreds.name
    } else if (rootState.mode == 'AI') {
      return 'Computer'
    } else {
      return 'Opponent'
    }
  },
  playerColor: (state, getters, rootState) => {
    if (rootState.mode == "Online PvP" && state.playerCreds.color) {
      return state.playerCreds.color;
    } else {
      return "white";
    }
  },
  opponentColor: (state, getters, rootState) => {
    if (rootState.mode == "Online PvP" && state.opponentCreds.color) {
      return state.opponentCreds.color;
    } else {
      return "black";
    }
  },
};

const actions = {
  // Listen to sockets AKA pull information
  SOCKET_pullName({ commit }, players) {
    commit("UPDATE_PLAYERS", players);
  },
  SOCKET_pullInvite({ commit }, inviter) {
    commit("SET_OPPONENT_CREDS", inviter);
    commit('SET_POPUP', 'reply', { root: true })
  },
  SOCKET_pullAccept({commit}) {
    commit('SET_POPUP', 'accepted', { root: true })
  },
  SOCKET_pullDecline({commit}) {
    commit('SET_POPUP', 'declined', { root: true })
  },
  SOCKET_pullRoom({ commit }, room) {
    commit("SET_ROOM", room);
  },
  SOCKET_pullColors({ commit }, colors) {
    commit("SET_PLAYER_COLORS", colors);
  },
  SOCKET_pullGame({ commit }, gameState) {
    commit("SET_GAME", gameState, { root: true });
    if (!gameState.chipSelected) {
      if (gameState.msg != "") {
        commit("ADD_MESSAGE", gameState.msg, { root: true });
      }
      if (Object.keys(gameState.removedChip).length > 0) {
        commit("panel/SUBTRACT_CHIP", gameState.removedChip, { root: true });
      }
    } else {
      commit("SET_WARNING", "", { root: true });
    }
    if (gameState.hasWon) {
      commit("SET_GAME_PLAYING", false, { root: true });
    }
    commit("SET_MOVE_PENDING", false);
  },
  SOCKET_pullInvalidMove({ commit }, msg) {
    commit("SET_WARNING", msg, { root: true });
  },
  // Speak to sockets AKA push information
  pushInvite({ state, commit }, invitee) {
    commit("SET_OPPONENT_CREDS", invitee);
    let players = {
      inviter: state.playerCreds,
      invitee: state.opponentCreds,
    };
    state.io.emit("pushInvite", players);
  },
  pushInviteReply({ state }, accept) {
    if (accept) {
      state.io.emit("pushAccept", state.opponentCreds.id);
    } else {
      state.io.emit("pushDecline", "Declined");
    }
  },
  pushMove({ state, commit }, targetedChip) {
    let moveInfo = {
      targetedChip: targetedChip,
      room: state.room,
    };
    commit("SET_MOVE_PENDING", true);
    state.io.emit("pushMove", moveInfo);
  },
  pushDeselectChip({ commit }, chip) {
    commit("SET_MOVE_PENDING", true);
    state.io.emit("pushDeselectChip", { chip: chip, room: state.room });
  },
  pushPassTurn({ commit }) {
    commit("SET_MOVE_PENDING", true);
    state.io.emit("pushPassTurn", { room: state.room });
  },
};

const mutations = {
  SET_SOCKET: (state, socket) => {
    state.io = socket;
  },
  SET_GAME: (rootState, game) => {
    rootState.board = game.board;
  },
  SET_ROOM: (state, room) => {
    state.room = room;
  },
  SET_MOVE_PENDING: (state, boolean) => {
    state.movePending = boolean;
  },
  SET_PLAYER_NAME: (state, playerName) => {
    state.playerCreds.name = playerName;
  },
  SET_PLAYER_CREDS: (state, player) => {
    state.playerCreds.name = player.name;
    state.playerCreds.id = player.id;
  },
  SET_OPPONENT_CREDS: (state, player) => {
    state.opponentCreds.name = player.name;
    state.opponentCreds.id = player.id;
  },
  SET_PLAYER_COLORS: (state, color) => {
    state.playerCreds.color = color.player;
    state.opponentCreds.color = color.opponent;
  },
  UPDATE_PLAYERS: (state, players) => {
    state.players = players;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
