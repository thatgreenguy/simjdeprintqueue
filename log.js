'use strict'

const config = require('config')
const winston = require('winston')

const CFG = config.get('CFG')
const tsFormat = () => (new Date()).toLocaleTimeString()

const options = {
  file: {
    level: CFG.LOG.LEVEL,
    filename: `${CFG.LOG.PATH}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: CFG.LOG.DEV'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

const log = winston.createLogger({
  level: CFG.LOG.LEVEL,
  // format: winston.format.json(),
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true
    }),
    new (winston.transports.File)({
      filename: CFG.LOG.FILE
    })
  ]
})

module.exports = log
