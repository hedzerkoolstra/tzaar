<template>
  <div
    class="chip"
    :id="field.id"
    :class="{
      black: field.color == 'black',
      white: field.color == 'white',
      empty: field.occupied == false,
      selected: field.selected == true,
      active: pathOptions.includes(field.id) && showHelper,
    }"
  >
    <div :class="{ tzarra: field.role == 'Tzarra' || field.role == 'Tzaar' }">
      
      <div :class="{ tzaar: field.role == 'Tzaar' }"></div>

    </div>

    <div
      class="height-indicator"
      :class="{ 'height-indicator--stacked': field.height > 1 }"
    >
      <div>{{ field.height }}</div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        field: Object
    },
    computed: {
    ...mapState([
      "pathOptions",
      "showHelper",
    ]),
  },

};
</script>
