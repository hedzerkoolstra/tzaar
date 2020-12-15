<template>
  <div class="name">
    <span v-if="!edit">{{ inputName }}</span>
    <input ref="name" v-else type="text" v-model="inputName" />

    <EditIcon v-if="!edit" @emit-event="edit = true" />
    <SaveIcon v-else @emit-event="saveName()" />
  </div>
</template>

<script>
import EditIcon from "@/components/buttons/EditIcon";
import SaveIcon from "@/components/buttons/SaveIcon";

export default {
  components: {
    EditIcon,
    SaveIcon,
  },
  data() {
    return {
      inputName: "",
      edit: false,
    };
  },
  computed: {
    players() {
      return this.$store.state.socket.players;
    },
  },
  created() {
    this.inputName = localStorage.getItem("playerName");
    if (this.inputName == undefined) {
      this.setAnonymousName();
    }
    this.$store.commit("socket/SET_PLAYER_NAME", this.inputName);
  },
  methods: {
    checkIfNameExists() {
      let nameExists = false;
      this.players.forEach((player) => {
        if (this.inputName == player.name) {
          nameExists = true;
        }
      });
      return nameExists;
    },
    setAnonymousName() {
      let n = Math.random()
      if (n < 0.1) {
        n = n + 0.1
      }
      let randomNumber = Math.round(n * 10000);
      this.inputName = "Guest-" + randomNumber;
    },
    saveName() {
      let nameExists = this.checkIfNameExists();
      if (!nameExists) {
        this.$socket.emit("pushName", this.inputName);
        this.$store.commit("socket/SET_PLAYER_NAME", this.inputName);
        localStorage.setItem("playerName", this.inputName);
        this.edit = false;
      } else {
        this.edit = false;
      }
    },
  },
};
</script>

<style lang="scss">

.name {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 1rem;
  margin-bottom: 2rem;
}
input {
  max-width: 60%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid $white;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  margin-right: 1rem;
  padding: 0;
}
.player-name .btn {
  padding: 0.2rem 0.3rem;
}
</style>