<template>
  <div>
    <div class="pt-14 bg-gray-800 text-gray-500 w-10 h-screen fixed top-0 left-0">
      <ul>
        <li class="bg-gray-800 hover:bg-gray-700 duration-300">
          <NuxtLink to="/" class="text-gray-600" exact>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10 px-2">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
            </svg>
          </NuxtLink>
        </li>
        <li class="bg-gray-800 hover:bg-gray-700 duration-300">
          <NuxtLink to="/a" class="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10 px-2">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </NuxtLink>
        </li>
        <li class="bg-gray-800 hover:bg-gray-700 duration-300">
          <NuxtLink to="/b" class="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10 px-2">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </NuxtLink>
        </li>
        <li class="bg-gray-800 hover:bg-gray-700 duration-300">
          <NuxtLink to="/c" class="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10 px-2">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <!--<div class="pt-14 bg-gray-700 ml-12 pl-4 h-screen fixed w-32">
      a
    </div>-->
  </div>
</template>

<script>
export default {
}
</script>

<style>
  .nuxt-link-active {
    @apply text-gray-100;
    @apply bg-white;
  }
</style>
