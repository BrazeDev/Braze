// const { attachPaginate } = require('knex-paginate')
// const consola = require('consola')
// const config = require('../../config.js')
// const db = require('./DatabaseController').db
const utils = require('./UtilsController')

// attachPaginate()

exports.modsInfo = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.modList = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.getModInfo = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.createMod = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.deleteMod = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.identifyMod = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}
