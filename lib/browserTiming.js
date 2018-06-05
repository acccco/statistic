let timeInfo = {}

if (window.performance && performance.timing) {
  let timing = performance.timing
  timeInfo = {
    requestWait: timing.requestStart - timing.navigationStart,    // 请求等待时间
    dnsReady: timing.domainLookupStart - timing.domainLookupEnd,  // dns 域名解析时间
    tcpReady: timing.connectStart - timing.connectEnd,            // tcp 连接时间
    request: timing.responseStart - timing.requestStart,          // html 请求时间
    domParse: timing.domInteractive - timing.fetchStart,          // 从输入 url 到 dom 完成耗费的时间
    eventLoaded: timing.loadEventEnd - timing.navigationStart     // 页面资源加载完成耗时
  }
}

export default timeInfo