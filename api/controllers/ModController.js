// const consola = require('consola')
// const config = require('../../config.js')
const db = require('./DatabaseController').db
const utils = require('./UtilsController')

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
    if (!q.params.slug) { return s.status(401).json({ success: false, message: 'Invalid parameters' }) }
    const mod = db('mods').where('slug', q.params.slug).first()
    if (!mod) { return s.json({ success: false, message: 'No mods found with given slug' }) }
    db('versions').select('*').where('mod', mod.id).then((mods) => {
      return s.json({
        success: true,
        name: mod.name,
        slug: mod.slug,
        author: mod.author,
        image: mod.image,
        web: mod.url,
        versions: ((!mods) ? 'No versions found' : mods)
      })
    })
  })
}

exports.getModInfoVer = async (q, s, n) => {
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
