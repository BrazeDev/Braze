// eslint-disable-next-line nuxt/no-cjs-in-config
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

  axios: {
    baseURL: require('./config.js').baseURL
  },

  css: [
  ],

  plugins: [
  ],

  router: {
    middleware: [
      'auth'
    ]
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
    localStorage: false,
    cookie: {
      options: {
        expires: 7
      }
    },
    strategies: {
      local: {
        token: {
          property: 'token'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: false,
          user: false
          /* logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' } */
        }
      }
    },
    plugins: [
    ]
  },

  build: {
  }
}
