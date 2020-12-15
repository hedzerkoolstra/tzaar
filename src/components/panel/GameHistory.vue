<template>
  <div id="game-history">
    <!-- <div class="note">Game has started</div> -->

    <div v-if="messages.length > 0" class="notes">
      <div class="note" v-for="(msg, i) in messages" :key="i">
        {{ msg }}
      </div>
    </div>

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
;

#game-history {
  flex: 1;
  margin: 1rem 0;
  background-color: $information-color;
  border-radius: $edge;
  color: white;
  overflow-y: auto;
  font-size: 12px;
}

.notes {
  margin-bottom: 1rem;
}
.note {
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
  &:nth-of-type(even) {
    background-color: #0a2e5e;
  }
}
.status {
  text-transform: capitalize;
  padding: 0.25rem 0.5rem;
}
.warning {
  text-transform: uppercase;
  color: rgb(235, 120, 99);
  padding: 0.25rem 0.5rem;
}
</style>