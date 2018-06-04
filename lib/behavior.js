import event from './event'

let behavior = {
  scroll: 0,
  keyup: 0,
  click: 0
}

let userBehavior = {
  scroll: 0,
  keyup: 0,
  click: 0
}

/**
 * 初始化方法
 */
function init() {
  event.create(document, 'click', () => {
    behavior.click++
    userBehavior.click++
  })

  event.create(document, 'keyup', () => {
    behavior.keyup++
    userBehavior.keyup++
  })

  event.create(document, 'scroll', () => {
    behavior.scroll++
    userBehavior.scroll++
  })
}

function getBehavior() {
  return behavior
}

function getUserBehavior() {
  let data = {
    scroll: userBehavior.scroll,
    keyup: userBehavior.keyup,
    click: userBehavior.click
  }
  userBehavior = {
    scroll: 0,
    keyup: 0,
    click: 0
  }
  return data
}

export default {
  init,
  getBehavior,
  getUserBehavior
}