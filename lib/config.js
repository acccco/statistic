import storage from "./storage"
import md5 from "blueimp-md5"

const config = {
  sessionId: '',
  clientId: '{{clientId}}',
  appId: '{{appId}}',
  domList: '{{domlist}}',//以 ; 分割
  namespaces: '{{namespaces}}',
  version: '{{version}}',
  pageAccessId: '',
  parentPageAccessId: '',
  pvStartTime: new Date().valueOf()
}

config.sessionId = storage.getData(config.namespaces + '_sid_' + config.appId) || Math.round(new Date() / 1E3)
storage.setData(config.namespaces + '_sid_' + config.appId, config.sessionId, true)

config.pageAccessId = md5(config.appid + window.location.href)

let ppai = storage.getData(config.namespaces + '_ppai_' + config.appId)
if (ppai && ppai !== config.pageAccessId) {
  config.parentPageAccessId = ppai
}

if (config.domList) {
  config.domList = config.domList.split(';')
}

export default config