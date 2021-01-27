const config = require('../config.js')
// eslint-disable-next-line import/order
const db = require('knex')(config.dbConnection)

db.
