const { attachPaginate } = require('knex-paginate')
// const consola = require('consola')
// const config = require('../../config.js')
// const db = require('./DatabaseController').db
const utils = require('./UtilsController')

attachPaginate()

const PackController = {}

PackController.createMagicPack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

PackController.packsInfo = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

PackController.packList = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

PackController.getPackInfo = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

PackController.createPack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

PackController.deletePack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

PackController.quickCreatePack = async (q, s, n) => {
  await utils.verifyToken(q, s, (t) => {
    return s.json({ status: 'Not Yet Implemented' })
  })
}

module.exports = PackController
