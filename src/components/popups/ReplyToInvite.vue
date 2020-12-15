<template>
  <div class="popup">
        <p>You have been invited by {{opponentCreds.name}}</p>
        <div>
          <button class="btn btn--text" @click="replyToInvite(true)">Accept</button>
          <button class="btn" @click="replyToInvite(false)">Decline</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
methods: {
    replyToInvite(isAccepted) {
      this.$store.dispatch('socket/pushInviteReply', isAccepted)
      this.$store.commit('SET_POPUP', 'none')
    },
  },
  computed: {
      ...mapState('socket', [
        'opponentCreds'
      ])
  }
}
</script>
