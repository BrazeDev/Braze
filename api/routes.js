const express = require('express')
const config = require('../config.js')
const router = express.Router()

router.get('/', (q, s, n) => {
  s.json({
    api: 'Braze',
    version: config.metadata.version,
    stream: 'DEV'
  })
})

router.get('/verify', (q, s, n) => {
  s.json({ error: 'No API key provided.' })
})

router.get('/verify/:key', (q, s, n) => {
  if (process.env.NODE_ENV !== 'PRODUCTION' && q.header('override-devkey') !== 'YES') {
    return s.json({
      valid: 'Key validated.',
      name: 'DEVELOPMENT TEST KEY',
      created_at: 'The beginning of time'
    })
  }
  s.json({
    error: 'Invalid key provided.'
  })
})

// Braze specific

router.get('/v1/', (q, s, n) => {
  s.json({
    api: 'Braze',
    version: config.metadata.version,
    solderCompatVersion: config.metadata.solderVersion,
    stream: config.metadata.stream,
    key: 'NOT_FOUND'
  })
})

module.exports = router
