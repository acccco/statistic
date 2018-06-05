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
  }
  endTime = new Date()
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
 * 获取页面总共的时间状态
 * pai : 页面唯一 ID  pvt : 页面总停留时间  pft : 页面聚焦时间
 * @returns {{pageId: string, pageViewedTime: number, pageFocusTime: number}}
 */
function getActiveTime() {
  let finishTime = new Date().valueOf()
  let activeTime = finishTime - startTime - noShowTime
  return {
    pageId: config.pageAccessId,
    pageViewedTime: finishTime - startTime,
    pageFocusTime: activeTime > 0 ? activeTime : 0
  }
}

/**
 * 获取页面距离上次调用该方法（或一开始）时间间隔内的时间状态
 * @returns {{pageId: string, pageViewedTime: number, pageFocusTime: number}}
 */
function getUserActiveTime() {
  let finishTime = new Date().valueOf()
  let activeTime = finishTime - userStartTime - userNoShowTime
  let time = {
    pageId: config.pageAccessId,
    pageViewedTime: finishTime - userStartTime,
    pageFocusTime: activeTime > 0 ? activeTime : 0
  }
  userStartTime = new Date()
  userNoShowTime = 0
  return time
}

/**
 * 每次 pv 开始前，需重置无关信息
 */
function clearNoUse() {
  userNoShowTime = 0
}

export default {
  init,
  getActiveTime,
  getUserActiveTime,
  clearNoUse
}