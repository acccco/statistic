import {event} from './event'

let behavior = {
  sc: 0,
  kc: 0,
  ckc: 0
}

let userBehavior = {
  sc: 0,
  kc: 0,
  ckc: 0
}

/**
 * 初始化方法
 */
export function bInit() {
  event.create(document, 'click', () => {
    behavior.ckc++
    userBehavior.ckc++
  })

  event.create(document, 'keyup', () => {
    behavior.kc++
    userBehavior.kc++
  })

  event.create(document, 'scroll', () => {
    behavior.sc++
    userBehavior.sc++
  })
}

export function getBehavior() {
  return behavior
}

export function getUserBehavior() {
  let data = {
    sc: userBehavior.sc,
    kc: userBehavior.kc,
    ckc: userBehavior.ckc
  }
  userBehavior = {
    sc: 0,
    kc: 0,
    ckc: 0
  }
  return data
}