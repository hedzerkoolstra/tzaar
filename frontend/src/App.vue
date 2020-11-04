<template>
  <div id="app">
    <SideBar />
    <Main />
    
  </div>
</template>

<script>
// Components
import Main from './components/Main';
import SideBar from './components/sidebar/SideBar';

// Style
import './assets/style.scss'

export default {
  name: 'app',
  components: {
    Main,
    SideBar  
  }
}
</script>

