import config from "./config";
import storage from "./storage";

let gutter = 1800000;

/**
 * 获取当前的页面信息
 * @returns {{
 *  pageId: string,
 *  href: string,
 *  title: string,
 *  channelType: number,
 *  parentPageId: string,
 *  referrer: string,
 *  pageViewedCount: number
 * }}
 */
export default function getPageInfo() {
  let data = {
    pageId: config.pageId,                // 页面 ID
    href: document.location.href,         // 当前页面的链接
    title: document.title,                // 页面 title
    channelType: 0,                       // 页面的进入渠道 0 直接访问 1 站内跳转(包含域名白名单内的域名) 2 外部链接
    parentPageId: config.parentPageId,    // 父页面 ID
    referrer: document.referrer,          // 页面的 referrer
    pageViewedCount: 0                    // 用户一共看了几个页面
  };
  let lastInTime = storage.getData(config.namespaces + "_pvLastInTime_" + config.appId) || 0;
  data.channelType = getPageInType(Number(lastInTime));

  let historyList = storage.getData(config.namespaces + "_pvHistoryList_" + config.appId);
  historyList = historyList ? historyList.split(",") : [];
  data.pageViewedCount = historyList.length;

  if (historyList[historyList.length - 1] !== config.pageId) {
    historyList.push(config.pageId);
  }

  storage.setData(config.namespaces + "_pvHistoryList_" + config.appId, historyList.join(","), true);
  storage.setData(config.namespaces + "_pvLastInTime_" + config.appId, config.pvStartTime, true);

  return data;
}

/**
 * 获取页面进入类型，0 直接访问 1 站内跳转(包含域名白名单内的域名) 2 外部链接
 * @param {number} lastInTime
 * @returns {number}
 */
function getPageInType(lastInTime) {
  // 直接访问
  if (!document.referrer) return 0;

  // 站内跳转，当大于一定时间间隔，算直接访问
  if (inList(document.referrer) && inList(document.location.href)) {
    return config.pvStartTime - lastInTime > gutter ? 0 : 1;
  }

  // 当前域名跳到子域名下算站内跳转
  let refDomain = getDomain(document.referrer);
  if (isChildDomain(refDomain, document.location.hostname)) {
    return config.pvStartTime - lastInTime > gutter ? 0 : 1;
  } else {
    return 2;
  }

}

/**
 * 判断域名是否在白名单中，包括白名单中域名的子域名
 * @param {string} url
 * @returns {boolean}
 */
function inList(url) {
  for (let d = 0; d < config.domList.length; d++) {
    if (-1 < config.domList[d].indexOf("/")) {
      if (includeUrl(url, config.domList[d]))
        return true;
    } else {
      let host = getHost(url);
      if (host && isChildDomain(host, config.domList[d]))
        return true;
    }
  }
  return false;
}

/**
 * 判断 url 是否在域名列表中，仅需要判断 url 是否以 domain 开头即可
 * @param {string} url
 * @param {string} domain
 * @returns {boolean}
 */
function includeUrl(url, domain) {
  url = url.replace(/^https?:\/\//, "");
  return 0 === url.indexOf(domain);
}

/**
 * 获取域名，不带端口
 * @param {string} url
 * @returns {string}
 */
function getHost(url) {
  return (url = getDomain(url)) ? url.replace(/:\d+$/, "") : url;
}

/**
 * 获取域名，带端口
 * @param {string} url
 * @returns {string}
 */
function getDomain(url) {
  let match = url.match(/^(https?:\/\/)?([^\/\?#]*)/);
  return match ? match[2].replace(/.*@/, "") : "";
}

/**
 * 判断 child 是否为 parent 的子域名，参数为域名格式，不带路径
 * @param {string} child
 * @param {string} parent
 * @returns {boolean}
 */
function isChildDomain(child, parent) {
  child = child.replace(/:\d+/, "");
  parent = parent.replace(/:\d+/, "");
  let d = child.indexOf(parent);
  return -1 < d && d + parent.length === child.length;
}
