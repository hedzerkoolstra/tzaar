<template>
  <div class="player-name">
    <span v-if="!edit">{{ playerName }}</span>
    <input ref="name" v-else type="text" v-model="playerName" />

    <EditIcon v-if="!edit" @emit-event="edit = true"/>
    <SaveIcon v-else @emit-event="saveName()"/>
    <!-- <button class="btn" v-if="!edit" @click="edit = true">Edit</button>
    <button class="btn"  @click="saveName()">Save</button> -->
  </div>
</template>

<script>
import EditIcon from '@/components/icons/EditIcon'
import SaveIcon from '@/components/icons/SaveIcon'


export default {
  components: {
    EditIcon,
    SaveIcon
  },
  data() {
    return {
      inputName: this.playerName,
      edit: false,
    };
  },
  computed: {
    playerName: {
        get() {
          return this.$store.state.playerName
        },
        set(name) {
          this.$store.commit('SET_PLAYER_NAME', name)
        }
        
    }
  },
  created() {
    this.playerName = localStorage.getItem('playerName')
    if (this.playerName == undefined) {
        this.setAnonymousName();
    }
  },
  methods: {
    setAnonymousName() {
        let playerNumber = Math.round(Math.random() * 10000);
        this.playerName = "Guest-" + playerNumber;
        this.$store.commit('SET_PLAYER_NAME', this.playerName)
    },
    saveName() {
        localStorage.setItem('playerName', this.playerName)
        this.edit = false
    }
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