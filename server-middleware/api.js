const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.json({
    api: 'Braze',
    version: 'v0.1.1',
    stream: 'dev'
  })
})

app.get('/api/mod/:modname', (req, res, next) => {
  res.json({
    error: 'Not Yet Implemented'
  })
})

app.get('/api/mod/:modname/:modversion', (req, res, next) => {
  res.json({
    error: 'Not Yet Implemented'
  })
})

app.get('/api/modpack/:packname', (req, res, next) => {
  res.json({
    error: 'Not Yet Implemented'
  })
})

app.get('/api/modpack/:packname/:build', (req, res, next) => {
  res.json({
    error: 'Not Yet Implemented'
  })
})

module.exports = app

