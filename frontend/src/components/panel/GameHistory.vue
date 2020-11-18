<template>
  <div id="game-history">
    <div class="note">Game has started</div>

    <div class="note" v-for="(msg, i) in messages" :key="i">
      {{ msg }}
    </div>

    <br />
    <div class="status">{{ activePlayer }} player's turn - action {{ action }}</div>
    <div class="warning" v-if="warning">{{ warning }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["activePlayer", "action", "messages", "warning"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

#game-history {
  flex: 1;
  margin: 1rem 0;
  background-color: #55636a;
  color: white;
  overflow-y: scroll;
  font-size: 12px;
}

.note {
  
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  &:nth-of-type(even) {
    background-color: #6f818a;
  }
}
.status {
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  // &::before {
  //   content: "";
  //   width: 4px;
  //   height: 4px;
  //   background-color: $white;
  // }
}
.warning {
  text-transform: uppercase;
  color: rgb(235, 120, 99);
  padding: 0.25rem 0.5rem;
}
</style>