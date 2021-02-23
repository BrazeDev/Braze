const randomstring = require('randomstring')
const { attachPaginate } = require('knex-paginate')
const consola = require('consola')
const bcrypt = require('bcrypt')
const config = require('../../config.js')
const db = require('./DatabaseController').db
const utils = require('./UtilsController')

attachPaginate()

const AuthController = {}

AuthController.verifyUser = async (q, s, n) => {
  const username = q.body.username
  const password = q.body.password
  if (username === undefined || password === undefined) {
    return s.json({ success: false, message: 'Missing username/password' })
  }
  const user = await db('users').where('username', username).first()
  if (!user) {
    return s.json({ success: false, message: 'Incorrect username/password' })
  }
  bcrypt.compare(`${password}-${username}-${user.NaCl}`, user.password, (e, r) => {
    if (e) {
      consola.error(e)
      return s.status(500).json({ success: false, message: 'There was an error processing your request' })
    }
    if (r === false) {
      return s.json({ success: false, message: 'Incorrect username/password' })
    }
    return s.json({
      success: true,
      token: user.token,
      user: {
        username: user.username,
        email: user.email,
        permissions: user.permissions
      }
    })
  })
}

AuthController.authorize = async (q, s) => {
  const token = q.headers.token
  if (token === undefined) { return s.status(401).json({ success: false, message: 'Token not present' }) }
  const user = await db('users').where('token', token).first()
  if (!user) { return s.status(401).json({ success: false, message: 'Invalid token' }) }
  return user
}

AuthController.checkName = async (q, s, n) => {
  if (!config.enableRegister) {
    return s.json({ success: false, message: 'Please don\'t use this to enumerate users. Ratelimited 1req/s' })
  }
  const user = await db('users').where('username', q.body.username).first()
  if (user) { s.json({ success: true, exists: true }) } else { s.json({ success: true, exists: false }) }
}

AuthController.register = async (q, s, n) => {
  if (!config.enableRegister) {
    return s.json({ success: false, message: 'Registration is disabled' })
  }
  const username = q.body.username
  const password = q.body.password
  const mailaddr = q.body.mailaddr
  if (username === undefined) { return s.json({ success: false, message: 'No username provided' }) }
  if (password === undefined) { return s.json({ success: false, message: 'No password provided' }) }
  if (mailaddr === undefined) { return s.json({ success: false, message: 'No email address provided' }) }
  if (username.length < 4 || username.length > 32) { return s.json({ success: false, message: 'Invalid username provided' }) }
  if (password.length < 8 || password.length > 64) { return s.json({ success: false, message: 'Invalid password provided' }) }
  if (await !utils.verifyEmail(mailaddr)) { return s.json({ success: false, message: 'Invalid email address provided' }) }
  // This is reeeeally hacky and I hate it. TODO: Move username checking to utils
  // update here and AuthController.checkName accordingly.
  const exists = await this.checkName(q, {
    json (data) {
      return data.exists || false
    }
  }, n)
  if (exists) { return s.json({ success: false, message: 'Username is in use' }) }
  const salt = randomstring.generate(32)
  bcrypt.hash(`${password}-${username}-${salt}`, 10, async (e, h) => {
    if (e) {
      consola.error(e)
      return s.status(500).json({ success: false, message: 'There was an error processing your request' })
    }
    const token = randomstring.generate(64)
    await db('users').insert({
      username,
      email: mailaddr,
      password: h,
      NaCl: salt,
      token,
      permissions: 0,
      timestamp: Math.floor(+new Date() / 1000)
    })
    return s.json({ success: true, token })
  })
}

AuthController.changePassword = async (q, s, n) => {
  const user = await this.authorize(q, s)
  const oldpass = q.body.oldpass
  const newpass = q.body.newpass
  const resetaccess = q.body.resetaccess === 'YES'
  if (oldpass === undefined) { return s.json({ success: false, message: 'Current password not provided' }) }
  if (newpass === undefined) { return s.json({ success: false, message: 'New password not provided' }) }
  if (newpass.length < 8 || newpass.length > 64) { return s.json({ success: false, message: 'Invalid new password provided' }) }
  const salt = randomstring.generate(32)
  bcrypt.hash(`${newpass}-${user.username}-${salt}`, 10, async (e, h) => {
    if (e) {
      consola.error(e)
      return s.status(500).json({ success: false, message: 'There was an error processing your request' })
    }
    await db('users').where('id', user.id).update({
      password: h,
      NaCl: salt,
      token: resetaccess ? randomstring.generate(64) : user.token
    })
  })
}

// Token Operations

AuthController.verifyToken = async (q, s, n) => {
  const token = q.body.token
  if (token === undefined) { return s.status(401).json({ success: false, message: 'Token not present' }) }
  const user = await db('users').where('token', token).first()
  if (!user) { return s.status(401).json({ success: false, message: 'Invalid token' }) }
  return s.json({ success: true, username: user.username })
}

AuthController.showToken = async (q, s, n) => {
  const user = await this.authorize(q, s)
  return s.json({ success: true, token: user.token })
}

AuthController.resetToken = async (q, s, n) => {
  const user = await this.authorize(q, s)
  const token = randomstring.generate(64)
  await db('users').where('token', user.token).update({ token })
  s.json({ success: true, token })
}

// API Key Operations

AuthController.verifyKey = async (q, s, n) => {
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

AuthController.addKey = async (q, s, n) => {
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

AuthController.listKeys = async (q, s, n) => {
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

AuthController.removeKey = async (q, s, n) => {
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

module.exports = AuthController
