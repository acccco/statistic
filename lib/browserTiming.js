let timeInfo = {}

if (window.performance && performance.timing) {
  let timing = performance.timing
  timeInfo = {
    nat: timing.requestStart - timing.navigationStart,
    ndt: timing.domainLookupStart - timing.domainLookupEnd,
    ntt: timing.connectStart - timing.connectEnd,
    srt: timing.responseStart - timing.requestStart,
    dpt: timing.domInteractive - timing.fetchStart,
    wit: timing.loadEventEnd - timing.navigationStart
  }
}

export default timeInfo