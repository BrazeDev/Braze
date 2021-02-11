const express = require('express')
const config = require('../config.js')
const solderapi = require('./controllers/SolderAPIController')
const router = express.Router()

router.get('/', solderapi.version)

router.get('/verify', solderapi.verify)

router.get('/verify/:key', (q, s, n) => {
  if (process.env.NODE_ENV !== 'PRODUCTION' && q.header('override-devkey') !== 'YES') {
    return s.json({
      valid: 'Key validated.',
      name: 'process.env.NODE_ENV != \'PRODUCTION\' - VALIDATION DISABLED',
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
