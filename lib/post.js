import config from "./config"
import storage from "./storage"

export function post(baseDate, type, data) {
  baseDate.et = type
  for (let key in data) {
    if (data[key] === '') {
      delete data[key]
    }
  }
  baseDate.ep = data

  let urls = []
  for (let key in baseDate) {
    let value = baseDate[key]
    if (key === 'ep') {
      value = JSON.stringify(baseDate[key])
    }
    if (value === '') {
      return
    }
    urls.push(`${key}=${encodeURIComponent(value)}`)
  }
  let url = `${config.postUrl}?${urls.join('&')}`

  let img = new Image()
  let name = "_post_log_" + Math.floor(2147483648 * Math.random()).toString(36)
  window[name] = img
  img.onload = img.onerror = img.onabort = function () {
    img.onload = img.onerror = img.onabort = null
    img = window[name] = null
    let urlStr = storage.getData(config.namespaces + '_unset_' + config.appid)
    storage.setData(config.namespaces + '_unset_' + config.appid, urlStr ? urlStr + '|' + urls.join('&') : urls.join('&'))
  }
  img.src = url
}

export function postImg(url) {
  url = config.postUrl + '?' + url
  let img = new Image()
  let name = "_post_log_" + Math.floor(2147483648 * Math.random()).toString(36)
  window[name] = img
  img.onload = img.onerror = img.onabort = function () {
    img.onload = img.onerror = img.onabort = null
    img = window[name] = null
    let urls = storage.getData(config.namespaces + '_unset_' + config.appid)
    storage.setData(config.namespaces + '_unset_' + config.appid, urls + '|' + url)
  }
  img.src = url
}