<template>
  <div>
    <h2>Select mode</h2>
    <div class="modes">
      <button
        class="btn"
        v-for="(item, i) in modes"
        :key="i"
        @click="setMode(item.mode)"
        :class="{ disabled: item.mode == 'AI' }"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modes: [
        {
          label: "Play Online",
          mode: "Online PvP",
        },
        {
          label: "Play Offline",
          mode: "Offline PvP",
        },
        {
          label: "Computer",
          mode: "AI",
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

<style lang="scss">
.modes {
  display: flex;
  flex-direction: column;
  .btn {
    margin-bottom: 1rem;
    width: 10rem;
    padding: 1rem 0;
  }
}
.modes .btn .disabled {
  background-color: $grey;
}
</style>