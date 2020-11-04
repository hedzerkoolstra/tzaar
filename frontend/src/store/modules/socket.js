import io from "socket.io-client";
io("localhost:3000")

const state = {
    socket: io("localhost:3000"),
};

const actions = {};

const mutations = {};

export default {
    state,
    actions,
    mutations
}