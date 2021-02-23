<template>
  <header class="w-screen p-3 shadow bg-white fixed z-10 top-0">
    <a href="https://braze.dev">
      <img src="/logo.png" alt="Logo" class="w-8 inline-block">
      <span class="pl-3 inline-block font-fira align-middle">Braze</span>
    </a>
    <span class="pl-1 inline-block text-gray-500 font-fira align-middle">Braze.dev {{ version }}</span>
    <span class="float-right font-fira align-middle mt-1">
      {{ this.$auth.user.username }}
      (<a id="logout" href="#" class=" text-purple-900 hover:text-purple-500 duration-200" @click="logout">Log Out</a>)
    </span>
  </header>
</template>

<script>
export default {
  data () {
    return {
      version: require('~/metadata.json').version
    }
  },
  methods: {
    logout () {
      this.$auth.logout('local')
      window.location.replace('/login')
    }
  }
}
</script>
