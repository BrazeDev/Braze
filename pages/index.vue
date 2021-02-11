<template>
  <div>
    <h1 class="text-center pt-5 pb-5 text-4xl font-fira leading-7">
      Welcome to Braze<br>
      <small class="text-lg text-gray-700">
        Brazing the gap between your mods and Technic
      </small>
    </h1>
    <h1 v-if="devenv" class="text-center pb-5 text-2xl font-fira text-red-500">
      WARNING: Braze is running in dev mode: any API key will be treated as valid
    </h1>
    <p class="text-justify">
      Braze is a super simple, yet powerful alternative to the official TechnicSolder. As per Technic's official documentation:<br>
      <span class="text-gray-600">TechnicSolder is an API that sits between a modpack repository and the Technic Launcher. It allows you to easily manage multiple modpacks in one single location.<br></span>
      <span v-show="showDesc" class="text-gray-600">Using Solder also means your packs will download each mod individually. This means the launcher can check MD5's against each version of a mod and if it hasn't changed, use the cached version of the mod instead. What does this mean? Small incremental updates to your modpack doesn't mean redownloading the whole thing every time!<br></span>
      <span v-show="showDesc" class="text-gray-600">Solder also interfaces with the Technic Platform using an API key you can generate through your account there. When Solder has this key it can directly interact with your Platform account. When creating new modpacks you will be able to import any packs you have registered in your Solder install. It will also create detailed mod lists on your Platform page! (assuming you have the respective data filled out in Solder) Neat huh?<br></span>
      <a href="#" class="text-sm" @click="showDescription">Show more...</a>
    </p>
    <div id="app" class="flex items-center justify-center w-full h-40 text-center">
      <div class="p-12 bg-gray-100 border-4 border-dashed rounded-md border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input
          id="assetsFieldHandle"
          ref="file"
          type="file"
          multiple
          name="fields[assetsFieldHandle][]"
          class="w-px h-px opacity-0 overflow-hidden absolute"
          accept=".pdf,.jpg,.jpeg,.png"
          @change="onChange"
        >
        <label for="assetsFieldHandle" class="block cursor-pointer">
          <div>
            Drag &amp; drop, or <span class="underline">click here</span> to quick-upload a mod
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      filelist: [],
      showDesc: false,
      devenv: process.env.NODE_ENV !== 'PRODUCTION'
    }
  },
  head: {
    htmlAttrs: {
      class: 'bg-gray-200'
    }
  },
  methods: {
    onChange () {
      this.filelist = [...this.$refs.file.files]
    },
    remove (i) {
      this.filelist.splice(i, 1)
    },
    dragover (event) {
      event.preventDefault()
      if (!event.currentTarget.classList.contains('bg-blue-50')) {
        event.currentTarget.classList.remove('bg-gray-100')
        event.currentTarget.classList.add('bg-blue-50')
      }
    },
    dragleave (event) {
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-blue-50')
    },
    drop (event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange()
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-blue-50')
    },
    showDescription (event) {
      this.showDesc = !this.showDesc
      event.currentTarget.innerHTML = this.showDesc ? 'Show less...' : 'Show more...'
    }
  }
}
</script>
