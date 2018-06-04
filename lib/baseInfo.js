import {client} from "./client"
import {config} from "./config"

/**
 * 获取 flash 版本号
 * @returns {string}
 */
function getFlashVersion() {
  var a = "";
  if (navigator.plugins && navigator.mimeTypes.length) {
    var b = navigator.plugins["Shockwave Flash"];
    b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
  } else if (window.ActiveXObject)
    try {
      if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
        (a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
    } catch (d) {
    }
  return a
}

/**
 * 获取 queryString
 * @param url
 * @param key
 * @returns {null}
 */
function matchQuery(url, key) {
  let d = url.match(RegExp("(^|&|\\?|#)(" + key + ")=([^&#]*)(&|$|#)", ""));
  return d ? d[3] : null
}

/**
 * 获取数据上次的通用参数
 * @returns {{rnd: number, ck: number, ja: number, cl: string, ds: string, ln: string, cid: string, sid: string, appid: string, v: string}}
 */
export function getBaseInfo() {
  return {
    rnd: Math.round(Math.random() * 2147483647),  // 随机值，防止请求缓存
    ck: client.cookieEnabled ? 1 : 0,             // 客户端是否允许 cookie
    ja: client.javaEnabled ? 1 : 0,               // 客户端是否允许 java
    cl: client.colorDepth + "-bit",               // 客户端屏幕颜色深度
    ds: client.screenSize,                        // 客户端屏幕大小
    ln: String(client.language).toLowerCase(),    // 客户端使用语言
    cid: config.cid,                              // 客户端唯一表示
    sid: config.sid,                              // session ID
    appid: config.appid,                          // 应用 ID
    v: config.version                             // js 版本
    // 以下数据项标志了来源页面
    /*fl: getFlashVersion(),
    cm: matchQuery(href, 'hmmd'),
    cp: matchQuery(href, '[hmpl|utm_medium]+'),
    cw: matchQuery(href, '[hmkw|utm_term]+'),
    ci: matchQuery(href, '[hmci|utm_content]+'),
    cf: matchQuery(href, '[hmsr|utm_source]+'),
    cu: matchQuery(href, '[hmcu|utm_campaign]+')*/
  }
}
