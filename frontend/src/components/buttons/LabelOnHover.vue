<template>
  <div class="label-on-hover">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String,
    },
  },
};
</script>

<style>
</style>