<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10 rounded-full" :src="mod.image" alt="">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ mod.name }}
          </div>
          <div class="text-sm text-gray-500">
            <a v-bind:href="mod.website">{{ mod.author }}</a>
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ mod.latestversion }}</div>
      <div class="text-sm text-gray-500">{{ mod.versions }} Versions</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ mod.status == 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
        {{ mod.statustext }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      In {{ mod.modpacks }} packs
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['mod']
}
</script>