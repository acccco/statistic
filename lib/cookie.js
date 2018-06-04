export const cookie = {
  /**
   * 设置 cookie > name
   * @param name
   * @param value
   * @param option(domain/path/H/hb)
   */
  set(name, value, option) {
    let f = new Date()
    option.H && f.setTime(f.getTime() + option.H)
    document.cookie = name + "=" + value + (option.domain ? "; domain=" + option.domain : "") + (option.path ? "; path=" + option.path : "") + (f ? "; expires=" + f.toGMTString() : "") + (option.hb ? "; secure" : "")
  },
  /**
   * 获取 cookie > name
   * @param name
   * @returns String
   */
  get(name) {
    return (name = RegExp("(^| )" + name + "=([^;]*)(;|$)").exec(document.cookie)) ? name[2] : undefined
  }
}