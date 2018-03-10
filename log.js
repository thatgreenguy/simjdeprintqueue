'use strict'

const config = require('config')
const winston = require('winston')

const CFG = config.get('CFG')

const log = winston.createLogger({
  level: CFG.LOG.LEVEL,
  format: winston.format.json(),
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: CFG.LOG.FILE
    })
  ]
})

module.exports = log
