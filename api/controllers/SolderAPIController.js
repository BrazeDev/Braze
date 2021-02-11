const config = require('../../config.js')

const SolderAPIController = {}

SolderAPIController.version = async (q, s, n) => {
  return await s.json({
    api: 'Braze',
    version: config.metadata.version,
    stream: 'DEV'
  })
}

SolderAPIController.verify = async (q, s, n) => {
  if (q.params.key === undefined) {
    return await s.json({ error: 'No API key provided.' })
  }
  if (process.env.NODE_ENV !== 'PRODUCTION' && q.header('override-devkey') !== 'YES') {
    return s.json({
      valid: 'Key validated.',
      name: 'DEVELOPMENT TEST KEY',
      created_at: 'The beginning of time'
    })
  }
  // eslint-disable-next-line no-constant-condition
  if (true /* replace with logic to check key */) {
    return s.json({
      valid: 'Key validated.',
      name: '/* replace with logic to get key name */',
      created_at: '/* replace with logic to get key creation timestamp */'
    })
  }
  s.json({
    error: 'Invalid key provided.'
  })
}

module.exports = SolderAPIController
