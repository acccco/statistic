import event from './lib/event'
import timing from "./lib/browserTiming"
import behavior from "./lib/behavior"
import acTime from "./lib/activeTime"
import config from "./lib/config"
import getPageInfo from './lib/pageInfo'
import storage from "./lib/storage"
import Event from "./lib/Event"

export default class Statistic extends Event {
  constructor() {
    super()
    this.firstPv = true
    try {
      this._init()
    } catch (e) {
      post(getBaseInfo(), 10, {
        rpu: document.referrer,
        errt: e.name,
        errm: e.message
      })
    }
  }

  _init() {
    acTime.init()
    behavior.init()

    this.$emit('init', this)

    event.create(window, 'load', () => {
      this.firstPv && post(getBaseInfo(), 0, getPageInfo())
      setTimeout(() => {
        post(getBaseInfo(), 1, timing())
      }, 5E3)
    })
    event.create(window, 'unload', () => {
      storage.setData(config.namespaces + '_ppai_' + config.appid, config.pageAccessId, true)
      post(getBaseInfo(), 3, Object.assign({
        su: window.location.href,
        ot: new Date() - config.pvStartTime
      }, behavior.getBehavior(), acTime.getActiveTime()))
    })

  }
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
  }, behavior.getUserBehavior(), acTime.getUserActiveTime()))
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
 * 自定义上传数据
 * @param arr
 */
export function customPost(arr) {
  post(getBaseInfo(), 2, {
    ot: new Date() - config.pvStartTime,
    pai: config.pageAccessId,
    data: arr.map(str => str.replace(/|/g, '**')).join('|')
  })
}
