<template>
  <div class="player-info">
    <div class="player-name">{{ this.playerName }}</div>
    <div class="captured-pieces">
      <div class="score">
        <span>{{piecesLeft.tzaar}}</span>
        <img :src="require('@/assets/images/' + icons[playerColor].tzaar) " alt="" />
      </div>
      <div class="score">
        <span>{{piecesLeft.tzarra}}</span>
        <img :src="require('@/assets/images/' + icons[playerColor].tzarra) " alt="" />
      </div>
      <div class="score">
        <span>{{piecesLeft.tott}}</span>
        <img :src="require('@/assets/images/' + icons[playerColor].tott) " alt="" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    playerName: String,
    playerColor: String,
  },
  data() {
    return {
      icons: {
        white: {
          tzaar: 'white-tzaar.png',
          tzarra: 'white-tzarra.png',
          tott: 'white-tott.png'
        },
        black: {
          tzaar: 'black-tzaar.png',
          tzarra: 'black-tzarra.png',
          tott: 'black-tott.png'
        },
      },
    };
  },
  computed: {
    piecesLeft() {
      return this.$store.state.panel.piecesLeft[this.playerColor]
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

.player-info {
  background-color: $sec-teal;
  color: $white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: $edge;
}

.player-name {
  margin-right: 2rem;
  font-weight: 700;
}

.captured-pieces {
  display: flex;
  div {
    margin-right: 2rem;
    &:last-of-type {
      margin-right: 0;
    }
  }
  img {
    max-width: 20px;
  }
  .score {
    display: flex;
    align-items: center;
    span {
      margin-right: 0.5rem;
    }
  }
}
</style>