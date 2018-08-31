export default {
  /**
   * 创建适合当前浏览器的 dom 事件
   * @param dom
   * @param eventName
   * @param cb
   */
  create(dom, eventName, cb) {
    if (dom.attachEvent) {
      dom.attachEvent("on" + eventName, function (e) {
        cb.call(dom, e)
      })
    } else if (dom.addEventListener) {
      dom.addEventListener(eventName, cb, false)
    }
  },
  /**
   * 通用的禁止 DOM 默认行为
   * @param dom
   */
  preventDefault(dom) {
    dom.preventDefault ? dom.preventDefault() : dom.returnValue = false
  }
}
