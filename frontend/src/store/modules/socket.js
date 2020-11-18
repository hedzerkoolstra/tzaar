const state = {
  move: 0,
  room: undefined,
  players: [{ name: "player1" }],
  io: {},
  invitationPending: false,
  playerCreds: {},
  opponentCreds: {}
};

const actions = {
  // Listen to sockets AKA pull information
  SOCKET_pullName({ commit }, players) {
    commit("UPDATE_PLAYERS", players);
  },
  SOCKET_pullInvite({ commit }, inviter) {
    commit('SET_OPPONENT', inviter)
    commit('SET_INVITATION_PENDING', true)
  },
  SOCKET_pullGame({commit}, gameState) {
    commit("SET_GAME", gameState, { root: true }) 
  },
  //
  // Speak to sockets AKA push information
  pushInvite({state, commit}, invitee) {
    commit('SET_OPPONENT', invitee)
    let players = {
      inviter: state.playerCreds,
      invitee: state.opponentCreds
    }
    console.log('players' + players);
    state.io.emit('pushInvitation', players)
  },
  pushInviteReply({state, commit}, accept) {
    console.log('pushInviteReply');
    if (accept) {
        // $store.watch is asynchronous, so only the bord randomizer is triggered in this function. socket/pushAccept is automatically called from Randomizer.vue  when randomizing the board is done.
        commit("SET_ROOM", state.opponentCreds.id);
        commit("CHANGE_PLAYER_COLORS");
        commit("RANDOMIZE_BOARD", true, { root: true });
      } else {
        state.io.emit("pushDecline", "Declined");
      }
      commit('SET_INVITATION_PENDING', false)
  },
  pushAccept({rootState, state, commit}) {
    state.io.emit("pushAccept", {room: state.opponentCreds.id, board: rootState.board});
    // Reset randomizer trigger
    commit("RANDOMIZE_BOARD", false, { root: true });
  },
  pushMove({state}, move) {
    state.io.emit("pushMove", move);
  }
};

const mutations = {
  SET_SOCKET: (state, socket) => {
    state.io = socket;
  },
  SET_GAME: (rootState, game) => {
    console.log(rootState);
    rootState.board = game.board;
  },
  SET_ROOM: (state, room) => {
    state.room = room;
  },
  SET_INVITATION_PENDING: (state, boolean) => {
    state.invitationPending = boolean;
  },
  SET_PLAYER_CREDS: (state, player) => {
    state.playerCreds = player;
    console.log(state.playerCreds);
  },
  SET_OPPONENT: (state, player) => {
    state.opponentCreds = player;
  },
  CHANGE_PLAYER_COLORS: (state) => {
    state.opponentCreds.color = 'white'
    state.playerCreds.color = 'black'
  },
  UPDATE_PLAYERS: (state, players) => {
    state.players = players;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
