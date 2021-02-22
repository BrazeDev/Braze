<template>
  <div class="flex flex-col h-screen my-auto items-center pt-32">
    <img src="/logo.png" class="w-24">
    <h3 class="font-fira text-4xl pt-6 text-gray-700">
      Braze
    </h3>
    <input id="username" type="text" name="username" placeholder="Username" class="font-fira border border-purple-300 placeholder-purple-300 focus:placeholder-opacity-0 rounded-lg w-80 mt-8 px-4 py-3 text-center">
    <input id="password" type="password" name="password" placeholder="Password" class="font-fira border border-purple-300 placeholder-purple-300 focus:placeholder-opacity-0 rounded-lg w-80 mt-5 px-4 py-3 text-center">
    <button type="submit" class="font-fira bg-purple-300 hover:bg-purple-600 duration-200 rounded-lg w-80 mt-5 px-4 py-4 tracking-wide" @click="doLogin">
      LOG IN
    </button>
    <div class="mt-2">
      <input id="remember" type="checkbox" name="remember" class="inline-block"> <label for="remember" class="inline-block text-sm pb-2"> Remember me</label>
    </div>
    <div class="mt-2">
      <a href="https://github.com/thatsimplekid/Braze" class="text-sm underline">Powered by Braze</a>&nbsp;<a href="/" class="text-sm underline text-gray-400 font-bold">83b45fd</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Swal from 'sweetalert2'

Vue.use(VueAxios, axios)

export default {
  layout: 'plain',
  data: () => ({
    isLoading: false
  }),
  methods: {
    async doLogin () {
      const { data } = await this.$http.get('/api/auth/login',
        { username: '', password: '', remember: '' })
      if (!data) { ; }
    },
    test () {
      Swal.fire('Hello world!')
    }
  }
}
</script>

<style>

</style>
