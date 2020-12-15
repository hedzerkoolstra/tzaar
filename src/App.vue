<template>
  <div id="app">
    <SideBar />
    <Main />
    <Overlay v-if="popup != 'none'" />
  </div>
</template>

<script>
// Components
import Main from './components/Main';
import SideBar from './components/sidebar/SideBar';
import Overlay from './components/popups/Overlay';

// Style
import './assets/style.scss'

export default {
  name: 'app',
  components: {
    Main,
    SideBar,
    Overlay  
  },
  beforeCreate() {
    console.log('create socket');
    this.$store.commit('socket/SET_SOCKET', this.$socket)
  },
  computed: {
      popup() {
        return this.$store.state.popup
      }
  }
}
</script>

