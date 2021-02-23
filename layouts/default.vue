<template>
  <div>
    <HeaderBar />
    <SideBar />
    <div class="pl-16 pt-20 pr-6">
      <div class="py-2 px-4 w-full bg-gray-50">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

function authenticate () {
  if (localStorage.getItem('token') === undefined) { return window.location.replace('/login') }
  axios.post('/auth/token', { token: localStorage.getItem('token') })
    .then((res) => {
      if (res.data.success === false) { return window.location.replace('/login') }
      localStorage.setItem('user', res.data.user)
    })
}

if (process.browser) {
  authenticate()
}

export default {

}
</script>
