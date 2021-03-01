const express = require('express')
const multer = require('multer')
const config = require('../config.js')
const AuthController = require('./controllers/AuthController.js')
const ModController = require('./controllers/ModController.js')
const KeyController = require('./controllers/KeyController.js')
const PackController = require('./controllers/PackController.js')
const SolderController = require('./controllers/SolderAPIController.js')
const utils = require('./controllers/UtilsController.js')
const router = express.Router()

/* Multer uploads
 * ----------------  */

// eslint-disable-next-line no-unused-vars
const upload = multer({
  storage: multer.diskStorage({
    destination (q, f, cb) {
      cb(null, config.folders.work)
    },
    filename (q, f, cb) {
      cb(null, utils.transformFilename(q, f))
    }
  })
})

/* Solder Routes
 * ----------------  */

router.get('/', SolderController.version)

router.get('/verify', (q, s, n) => AuthController.verifyKey(q, s, n))
router.get('/verify/:key', (q, s, n) => AuthController.verifyKey(q, s, n))

/* Braze API
 * ----------------  */

router.get('/v1/', (q, s, n) => {
  s.json({
    api: 'Braze',
    version: config.metadata.version,
    solderCompatVersion: config.metadata.solderVersion,
    stream: config.metadata.stream,
    key: 'NOT_FOUND'
  })
})

/* User Auth Routes
 * ----------------  */

router.post('/auth/login', (q, s, n) => AuthController.verifyUser(q, s, n))
router.post('/auth/register', (q, s, n) => AuthController.registerUser(q, s, n))
router.get('/auth/user', (q, s, n) => AuthController.fetchUser(q, s, n))

/* API Key Routes
 * ----------------  */

router.put('/keys/:key', (q, s, n) => KeyController.addKey(q, s, n))
router.get('/keys/:page', (q, s, n) => KeyController.listKeys(q, s, n))
router.delete('/keys/:key', (q, s, n) => KeyController.removeKey(q, s, n))

/* Mod Routes
 * ----------------  */

// Lists meta-info about the mods (count, total versions, latest, etc.)
router.get('/mods/', (q, s, n) => ModController.modsInfo(q, s, n))
// Gets a list of mods & their data on a page-by-page basis
router.get('/mods/list/:page', (q, s, n) => ModController.modList(q, s, n))
// Gets info about the mod with the supplied slug
router.get('/mods/:slug', (q, s, n) => ModController.getModInfo(q, s, n))
// Gets info about the mod with the supplied slug
router.get('/mods/:slug/:vers', (q, s, n) => ModController.getModInfoVer(q, s, n))
// Creates a mod with the supplied slug
router.post('/mods/:slug/:vers', (q, s, n) => ModController.createMod(q, s, n))
// Deletes the mod with the supplied slug
router.delete('/mods/:slug/:vers', (q, s, n) => ModController.deleteMod(q, s, n))
// Identifies what has been uploaded and returns information about the uploaded .zip/.jar/etc.
router.post('/mods/id', (q, s, n) => ModController.identifyMod(q, s, n))

/* Pack Routes
 * ----------------  */

// Does some real-life magic! (takes instance .zip and creates mods/pack from it)
router.post('/packs/imfeelinglucky', (q, s, n) => PackController.createMagicPack(q, s, n))
// Lists meta-info about the packs (count, total versions, latest, etc.)
router.get('/packs/', (q, s, n) => PackController.packsInfo(q, s, n))
// Gets a list of packs and basic pertinent data on a page-by-page basis
router.get('/packs/list/:page', (q, s, n) => PackController.packList(q, s, n))
// Gets info about the pack with the supplied slug
router.get('/packs/:slug', (q, s, n) => PackController.getPackInfo(q, s, n))
// Creates a pack with the supplied slug
router.post('/packs/:slug', (q, s, n) => PackController.createPack(q, s, n))
// Deletes the pack with the supplied slug
router.delete('/packs/:slug', (q, s, n) => PackController.deletePack(q, s, n))
// Quick Creates a pack from a single zipped instance (but with some supplied data, feeling less lucky?)
router.post('/packs/:slug/qc', (q, s, n) => PackController.quickCreatePack(q, s, n))

module.exports = router
