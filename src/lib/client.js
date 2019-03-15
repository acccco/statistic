import browserEvent from "./browserEvent";

function getOrientation() {
  let orientation = 0;
  if (window.orientation !== undefined) {
    orientation = window.orientation;
  }
  if (screen && (screen.orientation && screen.orientation.angle !== undefined)) {
    orientation = screen.orientation.angle;
  }
  clientInfo.orientation = orientation;
}

/**
 * 客户端基本信息采集
 * @type {{
 *  isIE: boolean,
 *  IEVersion: *,
 *  cookieEnabled: boolean,
 *  javaEnabled: boolean,
 *  language: string,
 *  screenSize: string,
 *  colorDepth: number,
 *  orientation: number
 * }}
 */
const clientInfo = {
  isIE: /msie (\d+\.\d+)/i.test(navigator.userAgent),
  IEVersion: /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || 0 : undefined,
  cookieEnabled: navigator.cookieEnabled,
  javaEnabled: navigator.javaEnabled(),
  language: navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "",
  screenSize: (window.screen.width || 0) + "x" + (window.screen.height || 0),
  colorDepth: window.screen.colorDepth || 0,
  orientation: 0
};

getOrientation();
browserEvent.create(window, "orientationchange", getOrientation);

export default clientInfo;
