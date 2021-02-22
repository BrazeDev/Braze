const config = require('../../config.js')

const SolderAPIController = {}

SolderAPIController.version = async (q, s, n) => {
  return await s.json({
    api: 'Braze',
    version: config.metadata.version,
    stream: 'DEV'
  })
}

module.exports = SolderAPIController
