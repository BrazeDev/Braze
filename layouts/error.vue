<template>
  <div>a</div>
</template>

<script>
export default {
  layout: 'error-l',
  mounted () {
    document.addEventListener('DOMContentLoaded', this.pageLoaded)
  },
  methods: {
    pageLoaded () {
      const GLITCH_CHARS = '`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/'.split('')
      // TODO Finish this
    }
  }
}
</script>

<style>

</style>
