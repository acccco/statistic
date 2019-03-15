/**
 * 用于获取页面的存在时间，以及聚焦时间
 */

import config from "./config";
import browserEvent from "./browserEvent";

/**
 * 获取对应浏览器的完整事件名
 * @param {string} name
 * @returns {string}
 */
function getPrefixName(name) {
  let bower = ["webkit", "ms", "moz", "o"];
  if (name in document) return name;
  for (let b = 0; b < bower.length; b++) {
    let prefixName = bower[b] + name.charAt(0).toUpperCase() + name.slice(1);
    if (prefixName in document) {
      return prefixName;
    }
  }
}

let endTime = new Date();
let startTime = new Date();
let noShowTime = 0;
let userStartTime = new Date();
let userNoShowTime = 0;
let hidden = getPrefixName("hidden");
let visibilityState = getPrefixName("visibilityState");
let focus = true;

/**
 * 更新相关时间，该函数在空闲时每隔 100 ms 调用一次，确保时间统计误差在 100 ms 以内
 */
function eventCall() {
  clearTimeout(eventCall.timer);
  let visible = true;
  if (visibilityState) {
    visible = document[visibilityState] === "visible";
  } else if (hidden) {
    visible = !document[hidden];
  }
  if (!(visible && focus)) {
    noShowTime += new Date() - endTime;
    userNoShowTime += new Date() - endTime;
  }
  endTime = new Date();
  eventCall.timer = setTimeout(eventCall, 100);
}

function init() {
  browserEvent.create(document, visibilityState.replace(/[vV]isibilityState/, "visibilitychange"), () => {
    eventCall();
  });
  browserEvent.create(window, "pageshow", () => {
    eventCall();
  });
  browserEvent.create(window, "pagehide", () => {
    eventCall();
  });

  if ("object" === typeof document.onfocusin) {
    browserEvent.create(document, "focusin", () => {
      focus = true;
      eventCall();
    });
    browserEvent.create(document, "focusout", () => {
      focus = false;
      eventCall();
    });
  } else {
    browserEvent.create(window, "focus", () => {
      focus = true;
      eventCall();
    });
    browserEvent.create(window, "blur", () => {
      focus = false;
      eventCall();
    });
  }
}

/**
 * 获取页面总共的时间状态
 * pageId : 页面唯一 ID  pageViewedTime : 页面总停留时间  pageFocusTime : 页面聚焦时间
 * @returns {{
 *  pageId: string,
 *  pageViewedTime:
 *  number, pageFocusTime: number
 * }}
 */
function getActiveTime() {
  let finishTime = new Date().valueOf();
  let activeTime = finishTime - startTime - noShowTime;
  return {
    pageId: config.pageId,
    pageViewedTime: finishTime - startTime,
    pageFocusTime: activeTime > 0 ? activeTime : 0
  };
}

/**
 * 获取页面距离上次调用该方法（或一开始）时间间隔内的时间状态
 * @returns {{
 *  pageId: string,
 *  pageViewedTime: number,
 *  pageFocusTime: number
 * }}
 */
function getUserActiveTime() {
  let finishTime = new Date().valueOf();
  let activeTime = finishTime - userStartTime - userNoShowTime;
  return {
    pageId: config.pageId,
    pageViewedTime: finishTime - userStartTime,
    pageFocusTime: activeTime > 0 ? activeTime : 0
  };
}

/**
 * 每次 pv 开始前，需重置无关信息
 */
function clearNoUse() {
  userStartTime = new Date();
  userNoShowTime = 0;
}

export default {
  init,
  getActiveTime,
  getUserActiveTime,
  clearNoUse
};
