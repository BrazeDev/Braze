const legit = require('legit')
const jwt = require('jsonwebtoken')
const consola = require('consola')
const config = require('../../config.js')
const burners = require('../../burnermail.json')

/**
 * Enum for the type of zip file that Braze is dealing with
 * @readonly
 * @enum {number}
 */
exports.zipType = {
  /** Zip file contains no known combination of files */
  UNKNOWN: 0,
  /** Zip file contains mods in the solder format */
  SOLDERMOD: 1,
  /** Zip file contains config data in the solder format */
  SOLDERCONFIG: 2,
  /** Zip file contains mods and config data in the solder format */
  SOLDEROTHER: 3,
  /** Zip file contains a full zipped modpack instance */
  FULLPACK: 4,
  /** Zip file contains multiple mod .JARs in the root */
  MULTIJAR: 5,
  /** Zip file contains data that is not relevant to minecraft */
  NONMCDATA: 100
}

/**
 * Checks to ensure that the supplied email address is valid, based on the options set in the config
 * @param {*} address The email address to check
 */
exports.verifyEmail = async (address) => {
  // Check email conforms with RFC 5322
  // Idk how this works but it's from https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])/
  if (!emailRegex.test(address)) { return false }
  // Check address against burner account domain list
  if (config.blockBurnerDomains) {
    const mailDomain = address.split('@')[1]
    if (burners.domains.includes(mailDomain)) { return false }
  }
  // Validate domain MX records
  if (config.performMXLookup) {
    const legitResponse = await legit(address)
    if (!legitResponse.isValid) { return false }
  }
  // Return true if all checks pass
  return true
}

/**
 * Verifies that the token in the request headers is valid
 * @param {*} q Express Request
 * @param {*} s Express Response
 * @param {verifyToken~successCallback} cb A callback that handles a success
 */
exports.verifyToken = async (q, s, cb) => {
  if (!q.headers.authorization.toString().split(' ')[1]) { s.status(401).json({ success: false, message: 'No token provided' }) }
  await jwt.verify(q.headers.authorization.toString().split(' ')[1], config.jwtSecret, (e, t) => {
    if (e) { return s.status(500).json({ success: false, message: 'There was a problem processing your request' }) }
    if (!t) { return s.status(500).json({ success: false, message: 'There was a problem processing your request' }) }
    cb(t)
  })
}

/**
 * Transforms the filename of an uploaded zip file to that specified in the config
 * @param {*} q Express Request
 * @param {*} f Multer file object
 */
exports.transformFilename = (q, f) => {
  let str = config.zipFileName
  str = str.replace('((filename))', f.filename)
  try {
    let author = jwt.decode(q.headers.authorization.toString().split(' ')[1])
    author = JSON.parse(author.payload).username
    str = str.replace('((author))', author)
  } catch (e) {
    str = str.replace('((author))', 'unknown')
    consola.error('Failed to get user on filename transform: ' + e)
  }
  str = str.replace('((date))', Math.floor(+new Date() / 1000))
  str = str.replace('((datehr))', new Date().format('ddMMyy-hhmmss'))
  str = str.replace('((dateus))', new Date().format('MMddyy-hhmmss'))
  return str
}
