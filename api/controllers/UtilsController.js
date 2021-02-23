const legit = require('legit')
const jwt = require('jsonwebtoken')
const config = require('../../config.js')
const burners = require('../../burnermail.json')

const UtilsController = {}

UtilsController.verifyEmail = async (address) => {
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

UtilsController.verifyToken = async (q, s, cb) => {
  if (!q.headers.authorization.toString().split(' ')[1]) { s.status(401).json({ success: false, message: 'No token provided' }) }
  await jwt.verify(q.headers.authorization.toString().split(' ')[1], config.jwtSecret, (e, t) => {
    if (e) { return s.status(500).json({ success: false, message: 'There was a problem processing your request' }) }
    if (!t) { return s.status(500).json({ success: false, message: 'There was a problem processing your request' }) }
    cb(t)
  })
}

module.exports = UtilsController
