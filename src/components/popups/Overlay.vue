<template>
  <div class="overlay">
      <div v-for="(item, i) in items" :key="i">
          <component v-if="popup == item.name" class="popup-item" :is="item.component">
          </component> 
      </div>
  </div>
</template>

<script>
import ReplyToInvite from './ReplyToInvite';
import AwaitInvite from './AwaitInvite';
import AcceptedInvite from './AcceptedInvite';
import DeclinedInvite from './DeclinedInvite';

export default {
  components: {
      AwaitInvite,
      ReplyToInvite,
      AcceptedInvite,
      DeclinedInvite
  },
  data() {
      return {
          items: [
              {
                  name: 'reply',
                  component: ReplyToInvite
              },
              {
                  name: 'await',
                  component: AwaitInvite
              },
              {
                  name: 'accepted',
                  component: AcceptedInvite
              },
              {
                  name: 'declined',
                  component: DeclinedInvite
              },
          ]
      }
  },
  computed: {
      popup() {
        return this.$store.state.popup
      }
  }
};
</script>

<style lang="scss" scoped>
;

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
}
</style>