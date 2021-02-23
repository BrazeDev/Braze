<template>
  <header class="w-screen p-3 shadow bg-white fixed z-10 top-0">
    <a href="https://braze.dev">
      <img src="/logo.png" alt="Logo" class="w-8 inline-block">
      <span class="pl-3 inline-block font-fira align-middle">Braze</span>
    </a>
    <span class="pl-1 inline-block text-gray-500 font-fira align-middle">Braze.dev {{ version }}</span>
    <span id="username"></span>
  </header>
</template>

<script>

let username = ''

function updateUsername () {
  username = localStorage.getItem('user')
  document.getElementById('username').innerHTML = username
}

if (process.browser) {
  setTimeout(updateUsername, 20)
}

export default {
  data () {
    return {
      version: require('~/metadata.json').version,
      username
    }
  }
}
</script>
