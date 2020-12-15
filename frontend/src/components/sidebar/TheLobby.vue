<template>
  <div class="lobby">
    <h2>Active players</h2>
    <div v-if="mode != 'Online PvP'">
      Select Online Mode to see online players.
    </div>
    <div v-else class="players">
      <div v-for="(player, i) in players" :key="i">
        <div v-if="playerName != player.name">
          <span class="players__name">{{ player.name }}</span>
          <button class="btn btn--invite" @click="invitePlayer(player)">Invite</button>
        </div>
      </div>
      <div v-if="!players || players.length <= 1">
        There are no active players.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    players() {
      return this.$store.state.socket.players;
    },
    playerName() {
      return this.$store.getters["socket/playerName"];
    },
    mode() {
      return this.$store.state.mode;
    },
  },
  methods: {
    invitePlayer(player) {
      this.$emit('close')
      this.$store.commit("SET_POPUP", "await");
      this.$store.dispatch("socket/pushInvite", player);
    },
  },
};
</script>

<style>
.btn--invite {
    padding: 4px 8px;
}
.players__name {
    margin-right: 1rem;
}
</style>