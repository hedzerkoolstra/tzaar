<template>
  <div class="overlay">
    <div class="popup">
        <p>You have been invited by {{opponentCreds.name}}</p>
        <div>
          <button class="btn btn--text" @click="replyToInvite(true)">Accept</button>
          <button class="btn" @click="replyToInvite(false)">Decline</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    replyToInvite(accept) {
      this.$store.dispatch('socket/pushInviteReply', accept)
    },
  },
  computed: {
      ...mapState('socket', [
        'opponentCreds'
      ])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.style {
    position: absolute
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  z-index: 10;
  .popup {
    margin: 70px auto;
    padding: 20px;
    background: $sec-teal;
    color: $white;
    border-radius: 5px;
    width: 30%;
    position: relative;
    top: 25%;
}
}
.btn {
        width: 6rem;
    padding: 0.5rem;
    margin-right: 2rem;
}
</style>