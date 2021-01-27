const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const api = require('./api/routes.js')
const config = require('./config.js')
const app = express()

app.set('port', config.port)

const nuxtConfig = require('./nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

const start = async () => {
  const nuxt = new Nuxt(nuxtConfig)
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use('/api', api)
  app.use(nuxt.render)
  app.listen(config.port, config.bind, () => {
    consola.ready({
      message: `Server listening on http://${config.bind}:${config.port}`,
      badge: true
    })
  })
}
start()

module.exports = {
  app
}

// export default { app }
