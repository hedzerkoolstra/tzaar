<template>
  <div id="sidebar">
    <div class="pri-bar">
      <h1>TZAAR</h1>
      <PlayerName />
      <ul>
        <li v-for="(item, i) in sidebarItems" :key="i">
          <button class="btn--text" @click="item.action(i)" >{{item.name}}</button>
        </li>
      </ul>
    </div>
    <div v-if="showSecBar" class="sec-bar" @mouseleave="showSecBar = false">
      <ul>
        <li v-for="(item, j) in sidebarItems[contentSecBar].secondaryBar" :key="j">
          <button class="btn--text" @click="item.action(item.mode)">{{item.name}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PlayerName from '@/components/sidebar/PlayerName';

export default {
  components: {
    PlayerName
  },
  data() {
    return {
      showSecBar: false,
      contentSecBar: 0,
      sidebarItems: 
      [
        {
          name: 'Play',
          action: this.showSec,
          secondaryBar: [
            {
              name: 'VS Computer',
              action: this.setMode,
              mode: 'AI'
            },
            {
              name: 'VS Player Online',
              action: this.setMode,
              mode: 'Online PvP'
            },
            {
              name: 'VS Player Offline',
              action: this.setMode,
              mode: 'Offline PvP'
            }
          ]
        },
        {
          name: 'Rules',
          action: this.showRules,
          secondaryBar: {
            name: 'PvP'
          }
        },
        {
          name: 'Lobby',
          action: this.goToLobby,
          secondaryBar: {
            name: 'PvP'
          }
        }
      ]
    };
  },
  methods: {
    showSec(i) {
      this.showSecBar = true;
      this.contentSecBar = i
    },
    showRules() {
      
    },
    goToLobby() {

    },
    setMode(mode) {
      this.showSecBar = false;
      window.localStorage.setItem('mode', mode)
      window.location.reload();
    }   
  }
};
</script>

<style lang="scss" >
@import "@/assets/_variables.scss";

#sidebar {
  h1 {
    letter-spacing: 8px;
    margin-top: 2rem;
  }
  ul {
    margin-top: 2rem;
  }
  li {
    list-style: none;
    margin-bottom: 1rem;
  }
  .btn--text {
    border: none;
    background-color: transparent;
    color: $white;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
    letter-spacing: 1px;
    padding: 0;
    outline: none;
  }
  .pri-bar {
    width: $sidebar-width;
    height: 100vh;
    background-color: $pri-dark;
    padding: 1rem;
    z-index: 5;
  }
  .sec-bar {
    position: absolute;
    width: auto;
    top: 0;
    left: calc(#{$sidebar-width} + 2rem);
    height: 100vh;
    background-color: $sec-dark;
    padding: 1rem 2rem;
    z-index: 5;
  }
}
</style>