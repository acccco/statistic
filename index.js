import {event} from './lib/event'
import {timing} from "./lib/timing"
import {bInit, getBehavior, getUserBehavior} from "./lib/behavior"
import {atInit, getActiveTime, getUserActiveTime} from "./lib/activeTime"
import {post, postImg} from "./lib/post"
import {config} from "./lib/config"
import {getPageInfo} from './lib/pageInfo'
import {getBaseInfo} from './lib/baseInfo'
import {storage} from "./lib/storage"

try {
  atInit()
  bInit()
  let firstPV = true

  let fncs = {
    _trackPageview: pageStart,
    _closePageview: pageClose,
    _trackEvent: userEvent,
    _setAutoPageview: function openFirstPV(arr) {
      firstPV = arr[1]
    },
    _postError: postError
  }

  let arr = window[config.varName] || []
  for (let i = 0, len = arr.length; i < len; i++) {
    arr[i] = typeof arr[i] === 'string' ? [arr[i]] : arr[i]
    fncs[arr[i][0]](arr[i])
  }
  let oldPush = arr.push
  arr.push = function (...events) {
    for (let i = 0, len = events.length; i < len; i++) {
      events[i] = typeof events[i] === 'string' ? [events[i]] : events[i]
      fncs[events[i][0]](events[i])
    }
    oldPush.apply(arr, events)
  }

  let urls = storage.getData(config.namespaces + '_unset_' + config.appid)
  urls = urls ? urls.split('|') : []
  storage.remove(config.namespaces + '_unset')
  while (urls[0]) {
    postImg(urls[0])
    urls.shift()
  }

  event.create(window, 'load', () => {
    firstPV && post(getBaseInfo(), 0, getPageInfo())
    setTimeout(() => {
      post(getBaseInfo(), 1, timing())
    }, 5E3)
  })

  event.create(window, 'unload', () => {
    storage.setData(config.namespaces + '_ppai_' + config.appid, config.pageAccessId, true)
    post(getBaseInfo(), 3, Object.assign({
      su: window.location.href,
      ot: new Date() - config.pvStartTime
    }, getBehavior(), getActiveTime()))
  })

} catch (e) {
  console.log(e)
  post(getBaseInfo(), 10, {
    rpu: document.referrer,
    errt: e.name,
    errm: e.message
  })
}

/**
 * 手动开启 pv 统计
 */
export function pageStart() {
  config.pageAccessId = new Date() % 63353
  config.pageInTime = Math.round(new Date() / 1E3)
  config.pvStartTime = new Date().valueOf()
  post(getBaseInfo(), 0, getPageInfo())
}

/**
 * 手动关闭 pv 并上传该页面的相关数据
 */
export function pageClose() {
  storage.setData(config.namespaces + '_ppai_' + config.appid, config.pageAccessId, true)
  config.parentPageAccessId = config.pageAccessId
  post(getBaseInfo(), 3, Object.assign({
    su: window.location.href,
    ot: new Date() - config.pvStartTime
  }, getUserBehavior(), getUserActiveTime()))
}

/**
 * 手动触发错误统计
 * @param e
 */
export function postError(e) {
  post({}, 10, {
    rpu: document.referrer,
    errt: e.name,
    errm: e.message
  })
}

/**
 * 自定义事件
 * @param arr
 */
export function userEvent(arr) {
  post(getBaseInfo(), 2, {
    ot: new Date() - config.pvStartTime,
    pai: config.pageAccessId,
    cat: arr[1],
    an: arr[2],
    ola: arr[3],
    ova: arr[4],
  })
}