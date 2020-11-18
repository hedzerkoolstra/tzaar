<template>
  <div class="player-name">
    <span v-if="!edit">{{ inputName }}</span>
    <input ref="name" v-else type="text" v-model="inputName" />

    <EditIcon v-if="!edit" @emit-event="edit = true" />
    <SaveIcon v-else @emit-event="saveName()" />
  </div>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon";
import SaveIcon from "@/components/icons/SaveIcon";

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
    // console.log(this.inputName);
    if (this.inputName == undefined) {
      this.setAnonymousName();
    }
    this.$store.commit("SET_PLAYER_NAME", this.inputName);
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
      let playerNumber = Math.round(Math.random() * 10000);
      this.inputName = "Guest-" + playerNumber;
    },
    saveName() {
      let nameExists = this.checkIfNameExists();
      if (!nameExists) {
        this.$socket.emit("pushName", this.inputName);
        this.$store.commit("SET_PLAYER_NAME", this.inputName);
        localStorage.setItem("playerName", this.inputName);
        this.edit = false;
      } else {
        console.log("Name Exists");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

.player-name {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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