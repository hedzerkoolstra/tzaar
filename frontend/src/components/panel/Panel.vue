<template>
  <div id="panel">
    
    <PlayerInfo :playerName="playerName" :playerColor="playerColor" />

    <Buttons />

    <GameHistory />

    <PlayerInfo :playerName="opponentName" :playerColor="opponentColor"/>

  </div>
</template>

<script>
import PlayerInfo from "@/components/panel/PlayerInfo";
import Buttons from "@/components/panel/Buttons";
import GameHistory from "@/components/panel/GameHistory";
import { mapGetters } from 'vuex'

export default {
  components: { GameHistory, PlayerInfo, Buttons },
  computed: {
    ...mapGetters('socket', [
      'playerColor',
      'opponentColor',
      'playerName',
      'opponentName',
    ])
  }
};
</script>

<style lang="scss">
;

#panel {
  border-radius: $edge;
  display: flex;
  flex-direction: column;
}
</style>