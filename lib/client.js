import event from "./event"

function b() {
  let a = 0;
  if (window.orientation !== undefined) {
    a = window.orientation
  }
  if (screen && (screen.orientation && screen.orientation.angle !== undefined)) {
    a = screen.orientation.angle
  }
  client.orientation = a
}

/**
 * 客户端基本信息采集
 * @type {{isIE: boolean, IEVersion: *, cookieEnabled: boolean, javaEnabled: boolean, language: string | * | string, screenSize: string, colorDepth: number, pageScroll(): *, cilentHight(): *, orientation: number}}
 */
const client = {
  isIE: /msie (\d+\.\d+)/i.test(navigator.userAgent),
  IEVersion: /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || 0 : undefined,
  cookieEnabled: navigator.cookieEnabled,
  javaEnabled: navigator.javaEnabled(),
  language: navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "",
  screenSize: (window.screen.width || 0) + "x" + (window.screen.height || 0),
  colorDepth: window.screen.colorDepth || 0,
  orientation: 0
}

b();
event.create(window, "orientationchange", b)

export default client
