// const consola = require('consola')
// const config = require('../../config.js')
// const db = require('./DatabaseController').db
const { db } = require('./DatabaseController')
const utils = require('./UtilsController')

exports.createMagicPack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.packsInfo = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.packList = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.getPackInfo = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.createPack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.deletePack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

exports.quickCreatePack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}
