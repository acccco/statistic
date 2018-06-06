import event from './lib/event'
import timing from "./lib/browserTiming"
import behavior from "./lib/behavior"
import acTime from "./lib/activeTime"
import config from "./lib/config"
import getPageInfo from './lib/pageInfo'
import storage from "./lib/storage"
import Event from "./lib/Event"
import md5 from "blueimp-md5"

export default class Statistic extends Event {
  constructor() {
    super()
    this.firstPv = true
    this._init()
  }

  _init() {
    acTime.init()
    behavior.init()

    this.$emit('init', this)

    event.create(window, 'load', () => {
      this.firstPv && this.$emit('windowLoad', getPageInfo()
      setTimeout(() => {
        this.$emit('browserTiming', timing())
      }, 5E3)
    })
    event.create(window, 'unload', () => {
      storage.setData(config.namespaces + '_ppai_' + config.appId, config.pageId, true)
      this.$emit('windowUnload', Object.assign(behavior.getBehavior(), acTime.getActiveTime()))
    })
  }

  pageStart() {
    acTime.clearNoUse()
    config.pageId = md5(config.appId + window.location.href)
    config.pvStartTime = new Date().valueOf()
    this.$emit('pageStart', getPageInfo())
  }

  pageClose() {
    storage.setData(config.namespaces + '_ppai_' + config.appId, config.pageId, true)
    config.parentPageId = config.pageId
    this.$emit('pageClose', Object.assign(behavior.getUserBehavior(), acTime.getUserActiveTime()))
  }

}
