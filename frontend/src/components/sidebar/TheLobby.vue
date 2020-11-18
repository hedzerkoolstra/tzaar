<template>
  <div class="lobby">
      <div class="title">Active players</div>
    <div class="players">
        <div v-for="(player, i) in players" :key="i">
            <div v-if="playerName != player.name">
                <span>{{player.name}}</span>
                <button
                class="btn"
                 @click="invitePlayer(player)">Invite</button>
            </div>
        </div>
    </div>
  </div>

</template>

<script>
export default {
    computed: {
        players() {
            return this.$store.state.socket.players
        },
        playerName() {
            return this.$store.state.playerName
        }
    },
    methods: {
        invitePlayer(player) {
            player.color = 'black'
            this.$store.dispatch('socket/pushInvite', player)
        }
    }
}
</script>

<style>

</style>