<template>
  <div>
    <h1 class="text-xl pb-10">Welcome to Braze! The lightweight, simple alternative to solder!</h1>
    <table class="table-fixed w-full md:w-2/3 lg:w-1/2 border-2 border-indigo-200 rounded-xl">
      <tbody class="statstable divide-y divide-indigo-200">
        <tr>
          <td class="w-1/2 pl-3 py-1">Braze API base URL</td>
          <td class="w-1/2">https://braze.dev/api/</td>
        </tr>
        <tr>
          <td class="w-1/2 pl-3 py-1">Braze Repo base URL</td>
          <td class="w-1/2">https://repo.braze.dev/</td>
        </tr>
        <tr>
          <td class="w-1/2 pl-3 py-1">Modpacks Configured</td>
          <td class="w-1/2">2</td>
        </tr>
        <tr>
          <td class="w-1/2 pl-3 py-1">Mods Configured</td>
          <td class="w-1/2">312</td>
        </tr>
        <tr>
          <td class="w-1/2 pl-3 py-1">Total Downloads</td>
          <td class="w-1/2">8</td>
        </tr>
        <tr>
          <td class="w-1/2 pl-3 py-1">Downloads today</td>
          <td class="w-1/2">0</td>
        </tr>
      </tbody>
    </table>
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
.statstable:nth-child(2) {
  @apply bg-indigo-100;
}
</style>
