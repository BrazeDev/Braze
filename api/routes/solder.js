const { Router } = require('express')

const router = Router()

router.get('/', function (q, s, n) {
  s.status(200).json({
    api: 'Braze',
    version: 'v1.2.3',
    stream: 'DEV'
  })
  n(q, s)
})

module.exports = router
