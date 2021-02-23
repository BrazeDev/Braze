const express = require('express')
const config = require('../config.js')
const AuthController = require('./controllers/AuthController.js')
const solderapi = require('./controllers/SolderAPIController')
const router = express.Router()

router.get('/', solderapi.version)

router.get('/verify', (q, s, n) => AuthController.verifyKey(q, s, n))
router.get('/verify/:key', (q, s, n) => AuthController.verifyKey(q, s, n))

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

// Authentication

router.post('/auth/login', (q, s, n) => AuthController.verifyUser(q, s, n))
router.post('/auth/register', (q, s, n) => AuthController.registerUser(q, s, n))
router.get('/auth/user', (q, s, n) => AuthController.fetchUser(q, s, n))

// API Keys

router.put('/keys/:key', (q, s, n) => AuthController.addKey(q, s, n))
router.get('/keys/:page', (q, s, n) => AuthController.listKeys(q, s, n))
router.delete('/keys/:key', (q, s, n) => AuthController.removeKey(q, s, n))

module.exports = router
