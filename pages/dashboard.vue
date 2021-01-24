<template>
  <div>
    <h1 class="text-xl">Welcome to Braze! The lightweight, simple alternative to solder!</h1>
  </div>
</template>

<script>
export default {
  layout: 'panel',
  head: {
    title: 'Dashboard | Braze',
  },
  created() {
    this.$store.commit('panel/setTitle', 'Dashboard')
  }
}
</script>

<style>

</style>
