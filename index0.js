#!/usr/bin/env node
'use strict'

const fse = require('fs-extra')

const args = Array.prototype.slice.call(process.argv)

const NBR_FILES = 10
const BASE_JOBNBR = 1000000
const PERCENTAGE = 100
const SEP = '_'

// const  MAX_SAMPLE_FILES = (process.argv[2] || NBR_FILES) + BASE_JOBNBR;
const MAX_SAMPLE_FILES = (args[2] || NBR_FILES) + BASE_JOBNBR
const PERCENT_SPLIT_EXCEL_FILES = 35

// const  TGT_BASE = (process.argv[3] || '/home/paul/Projects/printqueue/');
const TGT_BASE = '/home/paul/Projects/printqueue/'

const src = `${TGT_BASE}sample`
const simobj = [ 'R564220', 'R5542037', 'R5542565', 'R0901', 'R5542035' ]
const simver = [ 'ZJDE0001', 'UKZ0001', 'UKX001', 'UKX002', 'NIGHT01', 'NIGHT02' ]

function log (lvl, msg) {
  switch (lvl) {
    case 'i':
      console.info(msg)
      break
    case 'w':
      console.warn(msg)
      break
    case 'e':
      console.error(msg)
      break
    default:
  }
}

function genRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function genFilename (obj, ver, nbr, ext) {
  let filename = `${TGT_BASE}${obj}${SEP}${ver}${SEP}${nbr}${SEP}`
  if (ext < PERCENT_SPLIT_EXCEL_FILES) {
    filename = `${filename}xlsx`
  } else {
    filename = `${filename}PDF`
  }
  return filename
}

function fseCopyCb (tgt) {
  return function cb (e) {
    if (e) {
      log('e', tgt)
      throw e
    }
    return log('w', tgt)
  }
}

for (let jobnbr = 1000000; jobnbr < MAX_SAMPLE_FILES; jobnbr += 1) {
  const tgt = genFilename(
    simobj[genRandomInt(simobj.length - 1)],
    simver[genRandomInt(simver.length - 1)],
    jobnbr, genRandomInt(PERCENTAGE)
  )

  // fse.copy(src, tgt, cbFileCopy)
  fse.copy(src, tgt, fseCopyCb(tgt))
}
