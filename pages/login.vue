<!--
  TODO: This page NEEDS (I can't remember what I needed to do, so - Owen fill this in
                         when you remember what needs to be done here.)

    - Yes I did forget the TODO note halfway through writing it
 -->

<!--
  ALSO TODO: Turns out nuxt already has an authentication library and I made my own :(
    Looks like I'm spending another 18 hours trying to make my scheme conform to
    @nuxt/auth-next...

    This link covers most of what is needed to get this working. I know you hate me right
    now, future Owen - but this will be worth it!
    https://auth.nuxtjs.org/
    https://auth.nuxtjs.org/guide/setup/
    https://auth.nuxtjs.org/guide/middleware/
    https://auth.nuxtjs.org/schemes/local/     <-- I got to the beginning of this page
    https://auth.nuxtjs.org/api/options/
    https://auth.nuxtjs.org/api/auth/

    Contributors - sorry if you're trying to make sense of my ramblings, this is simply
      a note-to-self with the hopes that I will understand what this half-working mess
      is when I come back to it tomorrow.
 -->

<template>
  <div class="flex flex-col h-screen my-auto items-center pt-32">
    <img src="/logo.png" class="w-24">
    <h3 class="font-fira text-4xl pt-6 text-gray-700">
      Braze
    </h3>
    <input
      id="username"
      maxlength="32"
      type="text"
      name="username"
      placeholder="Username"
      class="font-fira border border-purple-300 placeholder-purple-300 focus:placeholder-opacity-0 rounded-lg w-80 mt-8 px-4 py-3 text-center">
    <input
      id="password"
      maxlength="64"
      type="password"
      name="password"
      placeholder="Password"
      class="font-fira border border-purple-300 placeholder-purple-300 focus:placeholder-opacity-0 rounded-lg w-80 mt-5 px-4 py-3 text-center">
    <button type="submit" class="font-fira bg-purple-300 hover:bg-purple-600 duration-200 rounded-lg w-80 mt-5 px-4 py-4 tracking-wide" @click="doLogin">
      LOG IN
    </button>
    <div class="mt-2">
      <input id="remember" checked type="checkbox" name="remember" class="inline-block"> <label for="remember" class="inline-block text-sm pb-2"> Remember me</label>
    </div>
    <div class="mt-2">
      <a href="https://github.com/thatsimplekid/Braze" class="text-sm underline">Powered by Braze</a>
      <a :href="'https://github.com/thatsimplekid/Braze/tree/' + commit" target="_blank" class="text-sm underline text-gray-400 font-bold">{{ commit.substring(0,7) }}</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'sweetalert2'

function redirIfLoggedIn () {
  if (localStorage.getItem('token') === undefined) { return }
  axios.post('/auth/token', { token: localStorage.getItem('token') })
    .then((res) => {
      if (res.data.success === false) { return }
      window.location.replace('/')
    })
}

if (process.browser) {
  redirIfLoggedIn()
}

Vue.use(VueAxios, axios)

export default {
  layout: 'plain',
  data: () => ({
    isLoading: false,
    commit: 'master'
  }),
  methods: {
    doLogin () {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const remember = document.getElementById('remember').checked
      if (username.length === 0) {
        document.getElementById('username').classList.remove('border-purple-300')
        document.getElementById('username').classList.remove('placeholder-purple-300')
        document.getElementById('username').classList.add('border-red-300')
        document.getElementById('username').classList.add('placeholder-red-300')
      }
      if (password.length === 0) {
        document.getElementById('password').classList.remove('border-purple-300')
        document.getElementById('password').classList.remove('placeholder-purple-300')
        document.getElementById('password').classList.add('border-red-300')
        document.getElementById('password').classList.add('placeholder-red-300')
      }
      if (username.length === 0 || password.length === 0) { return }
      axios.post('http://127.0.0.1:3000/api/auth/login', { username, password, remember })
        .then((res) => {
          if (!res.data.success) {
            Swal.fire({ icon: 'error', text: res.data.message })
            return
          }
          localStorage.setItem('token', res.data.token)
          window.location.replace('/')
        }).catch((e) => {
          Swal.fire({ icon: 'error', title: 'Oops!', text: `There was an error communicating with the server: ${e}` })
        })
    },
    test () {
      Swal.fire('Hello world!')
    }
  }
}
</script>

<style>

</style>
