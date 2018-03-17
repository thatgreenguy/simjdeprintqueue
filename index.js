'use strict'

const config = require('config')
const fse = require('fs-extra')
const log = require('./log')

const CFG = config.get('CFG')

function genRndInt (max) {
  return Math.floor(Math.random() * max)
}

function crtFakeJdeJob (n) {
  let o = CFG.JOB.OBJ[genRndInt(CFG.JOB.OBJ.length)]
  let v = CFG.JOB.VER[genRndInt(CFG.JOB.VER.length)]
  let e = CFG.JOB.EXT[genRndInt(CFG.JOB.EXT.length)]
  let s = CFG.JOB.SEP
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
  }
}

/**
 * do some shitfgfg
 * @wotisit
 */
for (let i = CFG.JOB.NBR; i < CFG.JOB.NBR + CFG.VOLUME.MIN; i++) {
  let fj = crtFakeJdeJob(i)
  let src = `${CFG.PATH.BASE}${CFG.PATH.SRC}/sample.${fj.ext}`
  let tgt = `${CFG.PATH.BASE}${CFG.PATH.TGT}/${fj.fakeJdeJob}.${fj.ext}`
  log.info({src, tgt})
  fse.copy(src, tgt, crtFseCopyCb(tgt))
}
