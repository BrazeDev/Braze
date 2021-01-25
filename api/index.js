const express = require('express')
const router = express.Router()

const app = router()

const solder = require('./routes/solder')
const auth = require('./routes/v1/auth')

app.use('/', solder)
app.use('/v1/auth', auth)

module.exports = app()

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
