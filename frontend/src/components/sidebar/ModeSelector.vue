<template>
  <div>
      <div class="sec-bar-head">
          <h3>Against:</h3>
          <!-- <slot></slot> -->
      </div>
      <ul>
        <li v-for="(item, i) in modes" :key="i">
          <button class="btn--text" @click="setMode(item.mode)">
            - {{ item.name }}
          </button>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modes: [
        {
          name: "Computer",
          mode: "AI",
        },
        {
          name: "Player Online",
          mode: "Online PvP",
        },
        {
          name: "Player Offline",
          mode: "Offline PvP",
        },
      ],
    };
  },
  methods: {
    setMode(mode) {
      window.localStorage.setItem("mode", mode);
      window.location.reload();
    },
  },
};
</script>

<style>
</style>