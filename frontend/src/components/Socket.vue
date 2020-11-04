<template>
  <div>
    <h1>Socket</h1>
    <button @click="sendMove()">Send data</button>
  </div>
</template>




<script>
// Socket.io
import io from "socket.io-client";

export default {
  data() {
    return {
      // socket: io("localhost:3000"),
      move: { a: 2 },
    };
  },
  created() {
    this.socket.on("note", (msg) => {
      console.log(msg);
    });
  },
  methods: {
    sendMove() {
        this.socket.emit('msg', this.move)
    }
  },
};
</script>
