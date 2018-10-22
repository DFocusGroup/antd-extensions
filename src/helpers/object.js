export function isNil(obj) {
  return obj === undefined || obj === null
}

export function isNumber(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function omit(obj, keys) {
  const newObj = {}
  Object.keys(obj).forEach(k => {
    if (keys.includes(k)) {
      return
    }
    newObj[k] = obj[k]
  })
  return newObj
}
