import {storage} from "./storage"
import md5 from "blueimp-md5"

const config = {
  sid: '',
  appid: '{{appid}}',
  cid: '{{cid}}',
  cidSourceType: '{{cidSourceType}}',
  domList: '{{domlist}}',//以 ; 分割
  namespaces: '{{namespaces}}',
  varName: '{{var}}',
  pageAccessId: '',
  parentPageAccessId: '',
  rootUrl: window.location.href.replace(/([^#]*)(\S*)/, '$1'),
  pvStartTime: new Date().valueOf(),
  version: '{{version}}',
  postUrl: '{{posturl}}'
}

console.log(config)

config.sid = storage.getData(config.namespaces + '_sid_' + config.appid) || Math.round(new Date() / 1E3)
storage.setData(config.namespaces + '_sid_' + config.appid, config.sid, true)

config.pageAccessId = md5(config.appid + window.location.href)

let ppai = storage.getData(config.namespaces + '_ppai_' + config.appid)
if (ppai && ppai !== config.pageAccessId) {
  config.parentPageAccessId = ppai
}

if (config.domList) {
  config.domList = config.domList.split(';')
}

if (Number(config.cidSourceType) === 1) {
  config.cid = storage.getData(config.namespaces + '_cid_' + config.appid)
}
storage.setData(config.namespaces + '_cid_' + config.appid, config.cid)

export {config}