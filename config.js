/* If you're looking for the config options, check braze.config.js

   This file is code for management of the config file and the options
   inside it - do *NOT* edit this unless you know what you're doing.

   To change the location where the config file will be searched for,
   you can provide the environment variable `CONFIG_PATH` or run the app
   with the `--config=/path/to/config` argument */

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
  if (!(config.bundledRepo === true || config.bundledRepo === false)) {
    consola.error(`${location} - Malformed config option: 'bundledRepo', must be true or false. Got "${config.bundledRepo}"`)
    process.exit(1)
  }
  if (config.bundledRepo === true && !(config.repoSubdir.length < 32 && config.repoSubdir.length > 0)) {
    consola.error(`${location} - Malformed config option: 'repoSubdir', must be between 1 and 32 chars. Got "${config.repoSubdir}"`)
    process.exit(1)
  }
  if (typeof config.dbConnection === 'undefined' ||
      typeof config.dbConnection.client === 'undefined' ||
      config.dbConnection.client.matches(/^(pg)|(sqlite3)|(mysql)|(mssql)$/)) {
    consola.error(`${location} - Malformed DB connection client, must be [ pg | sqlite3 | mysql | mssql ]. Got "${config.dbConnection.client}"`)
    process.exit(1)
  }
  if (config.dbConnection.client === 'sqlite3' && process.env.NODE_ENV === 'production') {
    consola.warn('SQLite databases are discouraged for production use. If you experience performance issues, consider using a different database provider')
  }
  return config
}

const setEnvironment = (config) => {
  config.environment = process.env.NODE_ENV
  return config
}

module.exports = setEnvironment(verifyConfig(loadConfig()))
