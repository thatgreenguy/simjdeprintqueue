'use strict'

const config = require('config')
const fse = require('fs-extra')
const log = require('./log')

const CFG = config.get('CFG')

function genRndInt (max) {
  console.log(max)
  let r = Math.floor(Math.random() * max)
  return r
}

function crtFakeJdeJob (n) {
  let o = CFG.JOB.OBJ[genRndInt(CFG.JOB.OBJ.length - 1)]
  let v = CFG.JOB.VER[genRndInt(CFG.JOB.VER.length - 1)]
  let e = CFG.JOB.EXT[genRndInt(CFG.JOB.EXT.length - 1)]
  let s = CFG.JOB.SEP
  console.log(e)
  return {
    'fakeJdeJob': `${o}${s}${v}${s}${n}${s}${e}`,
    'ext': e.toLowerCase()
  }
}

function crtFseCopyCb (tgt) {
  return function cb (e) {
    if (e) {
      log.error({e, tgt})
      throw e
    }
    return log.info({tgt})
  }
}

for (let i = CFG.JOB.NBR; i < CFG.JOB.NBR + CFG.VOLUME.MIN; i++) {
  let fj = crtFakeJdeJob(i)
  let src = `${CFG.PATH.BASE}${CFG.PATH.SRC}/sample.${fj.ext}`
  let tgt = `${CFG.PATH.BASE}${CFG.PATH.TGT}/${fj.fakeJdeJob}.${fj.ext}`
  log.info({src, tgt})
  fse.copy(src, tgt, crtFseCopyCb(tgt))
}
