<template>
  <p>404 Not Found</p>
</template>

<script>
export default {
  layout: 'error-l',
  mounted () {
    document.addEventListener('DOMContentLoaded', this.pageLoaded)
  },
  methods: {
    pageLoaded () {

    }
  }
}
</script>

<style>

</style>
