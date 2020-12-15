<template>
  <div class="popup">
    <p>Invitation Declined</p>
    <button class="btn" @click="closePopup()">OK</button>
  </div>
</template>

<script>
export default {
    methods: {
        closePopup() {
            this.$store.commit('SET_POPUP', 'none')
        }
    }
}
</script>

<style>

</style>