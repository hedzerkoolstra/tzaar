<template>
  <div>Socket
    <div>my color: {{me}}</div>
    <div>Opponent color: {{opp.color}}</div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      move: { a: 2 },
    };
  },
  computed: {
    playerName() {
      return this.$store.state.playerName
    },
    players() {
      return this.$store.state.socket.players
    },
    opp() {
      return this.$store.state.socket.opponentCreds
    },
    me() {
      return this.$store.state.socket.playerCreds.color
    }
  },
  sockets: {
    connect() {
      this.$socket.emit("pushName", this.playerName)
      this.$store.commit('socket/SET_PLAYER_CREDS', {
        name: this.playerName,
        id: this.$socket.id,
        color: 'white'
      })
    }
  },
  created() {
    this.$socket.connect()
    console.log('Socket rendered');
  },
  methods: {
    // sendMove() {
    //     this.socket.emit('msg', this.move)
    // }
  },
};
</script>
