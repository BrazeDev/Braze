const jwt = require('jsonwebtoken')
const randomstring = require('randomstring')
const consola = require('consola')
const bcrypt = require('bcrypt')
const config = require('../../config.js')
const db = require('./DatabaseController').db
const utils = require('./UtilsController')

/*
  User Authentication
  -------------------
*/

/**
 * Adds a new user to the database after performing checks to ensure the info is valid
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.registerUser = async (q, s, n) => {
  if (!config.enableRegister) { return s.json({ success: false, message: 'Registration is disabled' }) }
  if (!q.body.username || !q.body.password || !q.body.mailaddr) {
    return s.status(401).json({ success: false, message: 'Required info missing' })
  }
  if (q.body.username.length < 4 || q.body.username.length > 32) { return s.json({ success: false, message: 'Invalid username provided' }) }
  if (q.body.password.length < 8 || q.body.password.length > 64) { return s.json({ success: false, message: 'Invalid password provided' }) }
  if (await !utils.verifyEmail(q.body.mailaddr)) { return s.json({ success: false, message: 'Invalid email address' }) }
  // TODO: Check if username exists
  const salt = randomstring.generate(32)
  bcrypt.hash(`${q.body.password}-${q.body.username}-${salt}`, 10, async (e, h) => {
    if (e) {
      consola.error(e)
      return s.status(500).json({ success: false, message: 'There was a problem processing your request' })
    }
    await db('users').insert({
      username: q.body.username,
      email: q.body.mailaddr,
      password: h,
      NaCl: salt,
      permissions: 0,
      timestamp: Math.floor(+new Date() / 1000)
    })
    // Default expiration of 24 hours *ish*
    const token = jwt.sign({ username: q.body.username }, config.jwtSecret, { expiresIn: 86400 })
    return s.json({ success: true, token })
  })
}

/**
 * Verifies that a user is valid, checking the password of the user against the database
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.verifyUser = async (q, s, n) => {
  if (!q.body.username || !q.body.password) { return s.status(401).json({ success: false, message: 'Required info missing' }) }
  const user = await db('users').where('username', q.body.username).first()
  if (!user) { return s.json({ success: false, message: 'Invalid username/password' }) }
  bcrypt.compare(`${q.body.password}-${q.body.username}-${user.NaCl}`, user.password, (e, r) => {
    if (e) {
      consola.error(e)
      return s.status(500).json({ success: false, message: 'There was a problem processing your request' })
    }
    if (!r) { return s.json({ success: false, message: 'Invalid username/password' }) }
    const token = jwt.sign({ username: q.body.username }, config.jwtSecret, { expiresIn: 86400 })
    return s.json({ success: true, token })
  })
}

/**
 * Gets info about the user. The "user" object in the JSON response will become
 * `this.$auth.user` via nuxt auth
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.fetchUser = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    db('users').where('username', t.username).first().then((user) => {
      if (!user) { return s.status(500).json({ success: false, message: 'There was a problem processing your request' }) }
      s.status(200).json({
        success: true,
        user: {
          username: t.username,
          email: user.email,
          permissions: user.permissions
        }
      })
    })
  })
}

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
  const user = await this.authorize(q, s)
  const key = q.params.key
  const keyname = q.body.keyname
  if (key === undefined) { return s.json({ success: false, message: 'No API key provided.' }) }
  if (keyname === undefined) { return s.json({ success: false, message: 'No key name provided' }) }
  const kdb = await db('apikeys').where('key', key).first()
  if (kdb) { return s.json({ success: false, message: 'Key already exists' }) }
  await db('apikeys').insert({
    owner: user.id,
    keyname,
    key,
    timestamp: Math.floor(+new Date() / 1000)
  })
}

/**
 * Lists all API keys that are in the database (Requires auth)
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {*} n Express "next" callback
 */
exports.listKeys = async (q, s, n) => {
  // eslint-disable-next-line no-unused-vars
  const user = await this.authorize(q, s)
  db('apikeys').paginate({
    perPage: q.body.perPage | 10,
    currentPage: q.params.page | 0
  }).then((r) => {
    // THIS NEEDS TO BE TESTED AND FORMATTED IN A WAY THAT CAN BE UNDERSTOOD BY NUXT
    s.json(r)
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
