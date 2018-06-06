import config from "./config"
import storage from "./storage"

let gutter = 1800000

export default function getPageInfo() {
  let data = {
    referrer: document.referrer,
    href: document.location.href,
    pageId: config.pageId,
    pPageId: config.parentPageId,
    title: document.title,
    channelType: 0,
    pageViewedCount: 0
  }
  let history = storage.getData(config.namespaces + "_pvet_" + config.appId) || 0
  data.channelType = getPageInType(history)

  let historyList = storage.getData(config.namespaces + "_pvlt_" + config.appId)
  historyList = historyList ? historyList.split(',') : []
  data.pageViewedCount = historyList.length
  if (historyList[historyList.length - 1] !== config.pageId) {
    historyList.push(config.pageId)
  }

  storage.setData(config.namespaces + "_pvlt_" + config.appId, historyList.join(','), true)
  storage.setData(config.namespaces + "_pvet_" + config.appId, config.pvStartTime, true)

  return data
}

/**
 * 获取页面进入类型，0 直接访问 1 站内跳转 2 外部链接
 * @param lastInTime
 * @returns {number}
 */
function getPageInType(lastInTime) {
  if (!document.referrer) return config.pvStartTime - lastInTime > gutter ? 0 : 1
  if ((inList(document.referrer) && inList(document.location.href))) {
    return config.pvStartTime - lastInTime > gutter ? 0 : 1
  } else {
    let refDomain = getDomain(document.referrer)
    if (isChildDomain(refDomain, document.location.hostname)) {
      return config.pvStartTime - lastInTime > gutter ? 0 : 1
    } else {
      return 2
    }
  }
}

/**
 * 判断域名是否在列表中，包括是莫个域名的子域名
 * @param url
 * @returns {boolean}
 */
function inList(url) {
  for (let d = 0; d < config.domList.length; d++)
    if (-1 < config.domList[d].indexOf("/")) {
      if (includeUrl(url, config.domList[d]))
        return true
    } else {
      let host = getHost(url);
      if (host && isChildDomain(host, config.domList[d]))
        return true
    }
  return false
}

/**
 * 判断 dom 是否以 allUrl 开头
 * @param allUrl
 * @param dom
 * @returns {boolean}
 */
function includeUrl(allUrl, dom) {
  allUrl = allUrl.replace(/^https?:\/\//, "");
  return 0 === allUrl.indexOf(dom)
}

/**
 * 获取域名，不带端口
 * @param url
 * @returns {any}
 */
function getHost(url) {
  return (url = getDomain(url)) ? url.replace(/:\d+$/, "") : url
}

/**
 * 获取域名，带端口
 * @param url
 * @returns {any}
 */
function getDomain(url) {
  return (url = url.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? url[2].replace(/.*@/, "") : null
}

/**
 * 判断 child 是否为 parent 的子域名
 * @param child
 * @param parent
 * @returns {boolean}
 */
function isChildDomain(child, parent) {
  child = "." + child.replace(/:\d+/, "");
  parent = "." + parent.replace(/:\d+/, "");
  let d = child.indexOf(parent);
  return -1 < d && d + parent.length === child.length
}