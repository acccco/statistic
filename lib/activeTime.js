import event from "./event"
import config from "./config"

let endTime = new Date()
let startTime = new Date()
let noShowTime = 0
let userStartTime = new Date()
let userNoShowTime = 0

function getPrefixName(name) {
  if (!(name in document))
    for (let bower = ["webkit", "ms", "moz", "o"], b = 0; b < bower.length; b++) {
      var prefixName = bower[b] + name.charAt(0).toUpperCase() + name.slice(1);
      if (prefixName in document) {
        name = prefixName;
        break
      }
    }
  return name
}

let hidden = getPrefixName('hidden')
let visibilityState = getPrefixName('visibilityState')
let focus = true

function eventCall() {
  clearTimeout(eventCall.timer)
  let flag = true
  if (visibilityState) {
    flag = document[visibilityState] === 'visible'
  } else if (hidden) {
    flag = !document[hidden]
  }
  if (!(flag && focus)) {
    noShowTime += new Date() - endTime
    userNoShowTime += new Date() - endTime
    endTime = new Date()
  } else {
    endTime = new Date()
  }
  eventCall.timer = setTimeout(eventCall, 100)
}

function init() {
  event.create(document, visibilityState.replace(/[vV]isibilityState/, "visibilitychange"), eventCall)
  event.create(window, "pageshow", eventCall)
  event.create(window, "pagehide", eventCall)

  if ("object" === typeof document.onfocusin) {
    event.create(document, "focusin", () => {
      focus = true
      eventCall()
    })
    event.create(document, "focusout", () => {
      focus = false
      eventCall()
    })
  } else {
    event.create(window, "focus", () => {
      focus = true
      eventCall()
    })
    event.create(window, "blur", () => {
      focus = false
      eventCall()
    })
  }
}

/**
 * 获取页面相关状态，该方法的作用时间为：页面load 到 页面unload
 * pai : 页面唯一 ID  pvt : 页面总停留时间  pft : 页面聚焦时间
 * @returns {{pai: string, pvt: number, pft: number}}
 */
function getActiveTime() {
  let finishTime = new Date().valueOf()
  let activeTime = finishTime - startTime - noShowTime
  return {
    pai: config.pageAccessId,
    pvt: finishTime - startTime,
    pft: activeTime > 0 ? activeTime : 0
  }
}

/**
 * 和上面方法一致，该方法调用即获取到上次（或刚开始）到调用该方法时的页面相关状态
 * @returns {{pai: string, pvt: number, pft: number}}
 */
function getUserActiveTime() {
  let finishTime = new Date().valueOf()
  let activeTime = finishTime - userStartTime - userNoShowTime
  let time = {
    pai: config.pageAccessId,
    pvt: finishTime - userStartTime,
    pft: activeTime > 0 ? activeTime : 0
  }
  userStartTime = new Date()
  userNoShowTime = 0
  return time
}

export default {
  init,
  getActiveTime,
  getUserActiveTime
}