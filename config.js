/* If you're looking for the config options, check braze.config.js

   This file is code for management of the config file and the options
   inside it - do *NOT* edit this unless you know what you're doing.

   To change the location where the config file will be searched for,
   you can provide the environment variable `CONFIG_PATH` or run the app
   with the `--config=/path/to/config` argument */

const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))
const consola = require('consola')

let configfile = {}

let location = ''

const loadConfig = () => {
  if (typeof process.env.CONFIG_PATH !== 'undefined') {
    try {
      configfile = require(process.env.CONFIG_PATH)
      location = process.env.CONFIG_PATH
    } catch (e) {
      consola.error(`Unable to read config from env - "${process.env.CONFIG_PATH}".`)
      process.exit(1)
    }
  } else if (typeof args.config !== 'undefined') {
    try {
      configfile = require(args.config)
      location = args.config
    } catch (e) {
      consola.error(`Unable to read config from arg - "${args.config}".`)
      process.exit(1)
    }
  } else {
    try {
      configfile = require('./braze.config.js')
      location = '~/braze.config.js'
    } catch (e) {
      consola.error('Unable to read config. You can specify a custom location with the "CONFIG_PATH" env var, or the "--config" cmd line argument. You can also use the command "npm genconf" to generate a config file.')
      process.exit(1)
    }
  }
  try {
    configfile.metadata = require('./metadata.json')
  } catch (e) {
    consola.warn('Failed to find "metadata.json". Please re-clone the repo or re-download Braze.')
    // TODO: Add metadata download script
  }
  consola.info(`Loaded config from ${location}`)
  return configfile
}

const verifyConfig = (config) => {
  if (!(config.bind.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/) ||
        config.bind.match(/((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])/))) {
    consola.error(`${location} - Malformed bind address, must be a valid IPv4 or IPv6 address. Got "${config.bind}"`)
    process.exit(1)
  }
  if (!(config.port >= 1 && config.port <= 65535)) {
    consola.error(`${location} - Malformed port, must be between 1 and 65535. Got "${config.port}"`)
    process.exit(1)
  }
  if (typeof config.dbConnection === 'undefined' ||
      typeof config.dbConnection.client === 'undefined' ||
      !/^(pg)|(sqlite3)|(mysql)|(mssql)$/.test(config.dbConnection.client)) {
    consola.error(`${location} - Malformed DB connection client, must be [ pg | sqlite3 | mysql | mssql ]. Got "${config.dbConnection.client}"`)
    process.exit(1)
  }
  if (config.dbConnection.client === 'sqlite3') {
    consola.warn('SQLite databases are discouraged for production use. If you experience performance issues, consider using a different database provider')
  }
  if (config.jwtSecret === 'XwD48UY5ymQJuMP_This_is_an_example_key_do_not_use_NZJhKLJrUDa5S8W') {
    consola.error('The JWT secret has not be changed. Keeping the default value creates a serious risk of intrusion. Braze will now exit.')
    // process.exit(1)
  }
  if (config.jwtSecret.toString().lenth < 32) {
    consola.warn('The JWT secret should be at least 32 chars. Keys longer than 256 chars may cause performance issues')
  }
  return config
}

const setEnvironment = (config) => {
  config.environment = process.env.NODE_ENV
  return config
}

const checkAndCreateFolders = (config) => {
  if (config.dbConnection.client === 'sqlite3') {
    let db = config.dbConnection.connection.filename
    db = db.substr(0, db.lastIndexOf('/'))
    if (!fs.existsSync(db)) { fs.mkdirSync(db) }
  }
  const work = config.folders.work
  const repo = config.folders.repo
  if (!fs.existsSync(work)) {
    consola.info(`Creating work directory at: ${work}`)
    fs.mkdirSync(work)
  }
  if (!fs.existsSync(repo)) {
    consola.info(`Creating repo directory at: ${repo}`)
    fs.mkdirSync(repo)
  }
  try {
    fs.accessSync(work, fs.constants.W_OK)
  } catch (e) {
    consola.error(`Work directory "${work}" is not writable`)
    process.exit(3)
  }
  try {
    fs.accessSync(repo, fs.constants.W_OK)
  } catch (e) {
    consola.error(`Repo directory "${repo}" is not writable`)
    process.exit(3)
  }
  return config
}

module.exports = checkAndCreateFolders(setEnvironment(verifyConfig(loadConfig())))
