/* eslint-disable nuxt/no-cjs-in-config */
module.exports = {
  head: {
    title: 'braze',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  telemetry: false,

  css: [
  ],

  plugins: [
  ],

  router: {
    middleware: ['auth']
  },

  components: true,

  buildModules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      local: {

      }
    }
  },

  build: {
  }
}
