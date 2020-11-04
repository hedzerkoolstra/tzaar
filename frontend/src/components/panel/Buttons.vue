<template>
  <div class="buttons">
    <button
      class="btn"
      :class="{ disabled: action == 1 }"
      @click="switchTurn()"
    >
      Pass
    </button>
    <button
      class="btn"
      :class="{ disabled: !chipSelected }"
      @click="deselectChip()"
    >
      Deselect
    </button>

    
    <label class="switch">
        <input type="checkbox" @change="toggleHelper()">
        <span class="slider round"></span>
    </label>
    <!-- <button class="switch" @click="toggleHelper()"> -->
    
    <!-- </button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      switchStatus: "Off",
    };
  },
  computed: {
    ...mapState(["action", "chipSelected"]),
  },
  watch: {
    "$store.state.showHelper": function () {
      if (this.$store.state.showHelper) {
        this.switchStatus = "On";
      } else {
        this.switchStatus = "Off";
      }
    },
  },
  methods: {
    switchTurn() {
      this.$emit("switchTurn");
    },
    deselectChip(field) {
      this.$emit("deselectChip", field);
    },
    toggleHelper() {
      this.$store.commit("toggleHelper");
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

.buttons {
  display: flex;
  align-items: stretch;
  padding: 1rem 0;
  margin-top: 1rem;
  .btn {
    font-size: 12px;
    width: 6rem;
    padding: 0.5rem;
    margin-right: 1rem;
  }
}

.disabled {
  pointer-events: none;
  cursor: not-allowed;
  filter: saturate(0.2);
}

// Switch
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $background;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: $white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: $sec-teal;
}

input:focus + .slider {
  box-shadow: 0 0 1px $pri-teal;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>