<template>
  <div id="sidebar">
    <div class="inner-bar">
      <h1>TZAAR</h1>
      <PlayerName />

      <ul class="sidebar-list">
        <li v-for="(item, i) in sidebarItems" :key="i">
          <button class="btn--text" @click="activateComponent(item)">
            {{ item.name }}
          </button>
        </li>
      </ul>
      <div
        class="sidebar-item-wrapper"
        v-for="(item, i) in sidebarItems.filter((item) => getActiveItem(item))"
        :key="i"
      >
        <CloseIcon @emit-event="closeWindow()" class="btn--close" />
        <component
          @close="closeWindow()"
          class="sidebar-item"
          :is="item.component"
        >
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerName from "@/components/sidebar/PlayerName";
import CloseIcon from "@/components/buttons/CloseIcon";
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
      activeItem: "",
      sidebarItems: [
        {
          name: "Select Game Mode",
          component: ModeSelector,
        },
        {
          name: "Find Opponents",
          component: TheLobby,
        },
        {
          name: "How To Play",
          component: TheRules,
        },
      ],
    };
  },
  methods: {
    activateComponent(selectedItem) {
      this.activeItem = selectedItem.name;
    },
    getActiveItem(item) {
      return item.name == this.activeItem;
    },
    closeWindow() {
      this.activeItem = "";
    },
  },
};
</script>

<style lang="scss" >
#sidebar {
  min-height: 100%;
  font-size: 14px;
  h1 {
    letter-spacing: 8px;
    margin-top: 0;
    padding: 0 1rem;
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
    cursor: pointer;
    letter-spacing: 1px;
    padding: 0;
    outline: none;
  }
  .inner-bar {
    width: $sidebar-width;
    margin-top: 2rem;
    z-index: 5;
  }
  .sidebar-list {
    padding: 0 1rem;
    margin-bottom: 2rem;
  }
  .sidebar-item-wrapper {
    position: absolute;
    top: 4rem;
    min-height: 150px;
    left: 50%;
    transform: translateX(-50%);
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    background-color: $popup-color;
    border-radius: $edge;
    z-index: 5;
    .sidebar-item {
      padding: 1rem 2rem;
      min-width: 400px;
      h2 {
        margin-top: 0;
      }
    }
  }
  .btn--close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>