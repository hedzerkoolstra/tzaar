<template>
  <div class="buttons">
    <SkipIcon @emit-event="switchTurn()" :class="{ disabled: action == 1 }" />

    <DeselectIcon
      @emit-event="deselectChip()"
      :class="{ disabled: !chipSelected }"
    />

    <!-- <Randomizer :showIcon="true" v-if="mode == 'Offline PvP'" /> -->

    <label class="switch">
      <input type="checkbox" @change="toggleHelper()" />
      <span class="slider round"></span>
      <LabelOnHover :text="'Active Helper'" />
    </label>

  </div>
</template>

<script>
import { mapState } from "vuex";
import DeselectIcon from "../buttons/DeselectIcon.vue";
import SkipIcon from "../buttons/SkipIcon.vue";
import LabelOnHover from "../buttons/LabelOnHover";

export default {
  components: { SkipIcon, DeselectIcon, LabelOnHover },
  computed: {
    ...mapState(["action", "chipSelected", "mode"]),
  },
  methods: {
    switchTurn() {
      this.$store.dispatch("socket/pushPassTurn");
    },
    deselectChip(field) {
      this.$store.dispatch("socket/pushDeselectChip", field);
    },
    toggleHelper() {
      this.$store.commit("TOGGLE_HELPER");
    },
  },
};
</script>

<style lang="scss">
.buttons {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-top: 1rem;
  .btn--icon {
    margin-right: 1rem;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch {
  &:hover {
    .label-on-hover {
      opacity: 1;
      transition: 0.3s;
      font-size: 14px;
    }
  }
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
  background-color: $grey;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: $white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $button-color;
}

input:focus + .slider {
  box-shadow: 0 0 1px rgb(20, 20, 20);
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