// const consola = require('consola')
const StreamZip = require('node-stream-zip')
const config = require('../../config.js')
// const db = require('./DatabaseController').db
const utils = require('./UtilsController')

/**
 * Inspects a zip file, returning data regarding Braze's guess at what is in the file
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.inspectZip = async (q, s, n) => {
  // 🤦 Thanks, node-stream-zip
  // eslint-disable-next-line new-cap
  const zip = new StreamZip.sync({ file: q.files.path })
  const entries = Object.values(await zip.entries())
  let hasMods = false
  let hasConfig = false
  if (entries.some(e => e.isDirectory && e.name === 'mods')) { hasMods = true }
  if (entries.some(e => e.isDirectory && e.name === 'config')) { hasConfig = true }
  if (hasMods && !hasConfig) {
    if (entries.some(e => e.name.toString().split('.')[e.name.toString().split('.').size - 1] === 'jar' && e.name.toString.includes('mods/')))
  }
}
