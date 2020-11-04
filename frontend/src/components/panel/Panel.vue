<template>
  <div id="panel">
    <PlayerInfo :playerName="playerName" :playerColor="'white'" />

    <Buttons />

    <GameHistory />

    <PlayerInfo :playerName="'Opponent'" :playerColor="'black'"/>
  </div>
</template>

<script>
import PlayerInfo from "@/components/panel/PlayerInfo";
import Buttons from "@/components/panel/Buttons";
import GameHistory from "@/components/panel/GameHistory";

export default {
  components: { GameHistory, PlayerInfo, Buttons },
  computed: {
    playerName() {
      return this.$store.state.playerName
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

#panel {
  background-color: $pri-dark;
  border-radius: $edge;
  width: 22rem;
  padding: 2rem;
  color: black;
  display: flex;
  flex-direction: column;
}
</style>