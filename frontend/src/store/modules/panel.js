const state = {
  piecesLeft: {
    white: {
      tzaar: 6,
      tzarra: 9,
      tott: 15,
    },
    black: {
      tzaar: 6,
      tzarra: 9,
      tott: 15,
    },
  },
};

const actions = {};

const mutations = {
  UPDATE_SCORE(state, field) {
    let color = field.color;

    if (field.role == "Tzaar") {
      state.piecesLeft[color].tzaar -= 1;
    } else if (field.role == "Tzarra") {
      state.piecesLeft[color].tzarra -= 1;
    } else {
      state.piecesLeft[color].tott -= 1;
    }
  },
};

export default {
  state,
  actions,
  mutations,
};
