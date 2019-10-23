export function setStorage (key, value, day) {
  // 默认缓存15天
  const _ms = (day || 15) * 24 * 60 * 60 * 1000

  const data = {
    value: value,
    expires_at: new Date().getTime() + _ms / 1
  }

  localStorage.setItem(key.toString(), JSON.stringify(data))
}

export function getStorage (key) {
  let data = JSON.parse(localStorage.getItem(key.toString()))
  if (data !== null) {
    if (data.expires_at !== null && data.expires_at < new Date().getTime()) {
      localStorage.removeItem(key.toString())
    } else {
      return data.value
    }
  }
  return null
}

export function removeStorage (key) {
  localStorage.removeItem(key.toString())
}

export function clearStorage () {
  localStorage.clear()
}
