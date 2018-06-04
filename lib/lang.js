function srtFormat(a) {
  /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function (a) {
    var b = d[a]
    if (b)
      return b
    b = a.charCodeAt(0)
    return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
  }));
  return '"' + a + '"'
}

function b(a) {
  return 10 > a ? "0" + a : a
}

var d = {
  "\b": "\\b",
  "\t": "\\t",
  "\n": "\\n",
  "\f": "\\f",
  "\r": "\\r",
  '"': '\\"',
  "\\": "\\\\"
}

const lang = {
  parse(source) {
    return (new Function('return (' + source + ')'))()
  },
  stringify(d) {
    switch (typeof d) {
      case "undefined":
        return "undefined"
      case "number":
        return isFinite(d) ? String(d) : "null"
      case "string":
        return srtFormat(d)
      case "boolean":
        return String(d)
      default:
        if (d === null)
          return "null"
        if (d instanceof Array) {
          let arrFormat = ["["]
          for (let i = 0, n = d.length; i < n; i++) {
            let value = d[i]
            switch (typeof value) {
              case "undefined":
              case "function":
              case "unknown":
                break;
              default:
                arrFormat.push(this.stringify(value))
                arrFormat.push(",")
            }
          }
          arrFormat.pop()
          arrFormat.push("]")
          return arrFormat.join("")
        }
        if (d instanceof Date)
          return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"'

        let objFormat = ["{"]
        for (let key in d)
          if (Object.prototype.hasOwnProperty.call(d, key)) {
            let e = d[key]
            switch (typeof e) {
              case "undefined":
              case "unknown":
              case "function":
                break;
              default:
                objFormat.push(this.stringify(key) + ":" + this.stringify(e))
                objFormat.push(",")
            }
          }
        objFormat.pop()
        objFormat.push("}")
        return objFormat.join("")
    }
  },
  is(obj, type) {
    return "[object " + type + "]" === {}.toString.call(obj)
  }
}

export {lang}