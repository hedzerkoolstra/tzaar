<template>
  <div id="sidebar">
    <div class="pri-bar">
      <h1>TZAAR</h1>
      <PlayerName />
      
      <ul>
        <li v-for="(item, i) in sidebarItems" :key="i">
          <button class="btn--text" @click="activateComponent(item)">
            {{ item.name }}
          </button>
        </li>
      </ul>
      <div class="sec-bar" v-for="(item, i) in sidebarItems" :key="i" >
        <CloseIcon v-if="item.active" @emit-event="closeWindow()" class="btn-wrapper" />
        <component v-if="item.active" class="content" :is="item.component">
          
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerName from "@/components/sidebar/PlayerName";
import CloseIcon from "@/components/icons/CloseIcon";
import ModeSelector from "@/components/sidebar/ModeSelector";
import TheRules from "@/components/sidebar/TheRules";
import TheLobby from "@/components/sidebar/TheLobby";

export default {
  components: {
    PlayerName,
    CloseIcon,
    ModeSelector,
    TheRules,
    TheLobby,
  },
  data() {
    return {
      sidebarItems: [
        {
          name: "Play",
          active: false,
          component: ModeSelector,
        },
        {
          name: "Rules",
          active: false,
          component: TheRules,
        },
        {
          name: "Lobby",
          active: false,
          component: TheLobby,
        },
      ],
    };
  },
  methods: {
    activateComponent(selectedItem) {
      this.closeWindow();
      selectedItem.active = true;
    },
    closeWindow() {
      this.sidebarItems.forEach((item) => {
        item.active = false;
      });
    },
  },
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
    z-index: 5;
    .content {
      margin-top: 10rem;
      padding: 0 2rem;
    }
  }
  .btn-wrapper {
    margin-left: auto;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>