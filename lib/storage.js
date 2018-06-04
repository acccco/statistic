let local = {
  get(name) {
    return window.localStorage.getItem(name)
  },
  set(name, value) {
    window.localStorage.setItem(name, value)
  }
}

let session = {
  get(name) {
    return window.sessionStorage.getItem(name)
  },
  set(name, value) {
    window.sessionStorage.setItem(name, value)
  }
}

export default {
  getData(name) {
    return local.get(name) || session.get(name)
  },
  setData(name, value, isSession) {
    isSession ? session.set(name, value) : local.set(name, value)
  },
  remove(name) {
    window.localStorage.removeItem(name)
    window.sessionStorage.removeItem(name)
  }
}