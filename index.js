'use strict'

const config = require('config')
// import {fse} from 'fs-extra'

const simdata = config.get('simdata')

console.log('Max files: ' + simdata.files.minimum)
