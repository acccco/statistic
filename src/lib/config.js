import storage from "./storage";
import md5 from "blueimp-md5";

// 基本配置信息
const config = {
  appId: "{{appId}}", // 应用级别的 ID ，需要客户端给，一般写在请求的 js 上
  namespaces: "{{namespaces}}", // 存储在 storage 中键值的前缀，防止命名冲突
  domList: "{{domList}}", // 允许的域名列表，需要后端填充数据，以 ; 作为分割符
  sessionId: "", // 会话级别的 ID ，浏览器关闭后失效
  pageId: "", // 页面级 ID ，用于跟踪页面访问轨迹
  parentPageId: "", // 父页面 ID
  pvStartTime: new Date().valueOf(), // 开启 pv 统计的时间,
  version: "{{version}}", // 当前的版本号
};

// session 获取策略为页面当前进入时间，当然如果 sessionStorage 中有值以 sessionStorage 为准，确保唯一性
config.sessionId =
  storage.getData(config.namespaces + "_sessionId_" + config.appId) ||
  Math.round(new Date() / 1e3);
storage.setData(
  config.namespaces + "_sessionId_" + config.appId,
  config.sessionId,
  true,
);

// 页面唯一 ID 生成，根据 appId 和当前 url
config.pageId = md5(config.appId + window.location.href);

// 获取父页面的 ID
let parentPageId = storage.getData(
  config.namespaces + "_pageId_" + config.appId,
);
if (parentPageId && parentPageId !== config.pageId) {
  config.parentPageId = parentPageId;
}

if (config.domList) {
  config.domList = config.domList.split(";");
}

export default config;
