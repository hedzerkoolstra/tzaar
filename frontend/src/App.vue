<template>
  <div id="app">
    <SideBar />
    <Main />
    <InvitationBox v-if="invitationPending" />
  </div>
</template>

<script>
// Components
import Main from './components/Main';
import SideBar from './components/sidebar/SideBar';
import InvitationBox from './components/InvitationBox';

// Style
import './assets/style.scss'

export default {
  name: 'app',
  components: {
    Main,
    SideBar,
    InvitationBox  
  },
  beforeCreate() {
    console.log('create socket');
    this.$store.commit('socket/SET_SOCKET', this.$socket)
  },
  computed: {
      invitationPending() {
        return this.$store.state.socket.invitationPending
      }
  }
}
</script>

