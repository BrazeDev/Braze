const consola = require('consola')
const db = require('./DatabaseController').db
const utils = require('./UtilsController')

/*
  API Key management
  ------------------
*/

/**
 * Verifies an API key against the database
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.verifyKey = async (q, s, n) => {
  if (process.env.NODE_ENV !== 'PRODUCTION' && q.header('override-devkey') !== 'YES') {
    return s.json({
      valid: 'Key validated.',
      name: 'process.env.NODE_ENV != \'PRODUCTION\' - VALIDATION DISABLED',
      created_at: 'The beginning of time'
    })
  }
  const key = q.params.key
  if (key === undefined) { return s.json({ error: 'No API key provided.' }) }
  const kdb = await db('apikeys').where('key', key).first()
  if (!kdb) { return s.json({ error: 'Invalid key provided.' }) }
  return { valid: true, name: kdb.keyname, created_at: kdb.timestamp }
}

/**
 * Adds a new API key to the database (Requires auth)
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.addKey = async (q, s, n) => {
  await utils.verifyToken(q, s, async (t) => {
    if (q.params.key === undefined) { return s.json({ success: false, message: 'No API key provided.' }) }
    if (q.body.keyname === undefined) { return s.json({ success: false, message: 'No key name provided' }) }
    const kdb = await db('apikeys').where('key', q.params.key).first()
    if (kdb) { return s.json({ success: false, message: 'Key already exists' }) }
    db('apikeys').insert({
      owner: t.uid,
      keyname: q.body.keyname,
      key: q.params.key,
      timestamp: Math.floor(+new Date() / 1000)
    }).then((a) => {
      return s.json({ success: true, message: 'Added new key' })
    })
  })
}

/**
 * Lists all API keys that are in the database (Requires auth)
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.listKeys = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    db('apikeys').paginate({
      perPage: q.body.perPage | 10,
      currentPage: q.params.page | 0
    }).then((r) => {
      consola.info(JSON.stringify(r, null, '  '))
      s.json(r)
    })
  })
}

/**
 * Instantly removes the given key from the database (Requires auth)
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.removeKey = async (q, s, n) => {
  // eslint-disable-next-line no-unused-vars
  const user = await this.authorize(q, s)
  const key = q.params.key
  if (key === undefined) { return s.json({ success: false, message: 'No API key provided.' }) }
  const kdb = await db('apikeys').where('key', key).first()
  if (!kdb) { return s.json({ success: false, message: 'Key does not exist' }) }
  db('apikeys').where('key', key).del().then(() => {
    return s.json({ success: true, message: 'Key deleted' })
  })
}
