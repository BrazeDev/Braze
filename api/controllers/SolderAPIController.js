const config = require('../../config.js')

exports.version = async (q, s, n) => {
  return await s.json({
    api: 'Braze',
    version: config.metadata.version,
    stream: 'DEV'
  })
}
