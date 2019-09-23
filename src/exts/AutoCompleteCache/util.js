import { isArray } from '../../helpers/object'

export function delay(func, wait, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return setTimeout(func, +wait || 0, ...args)
}

export function uniqArray(data) {
  if (!isArray(data)) {
    return data
  }

  let uniq = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (!uniq.includes(item)) {
      uniq.push(item)
    }
  }
  return uniq
}

export function differenceArray(data, excludedArray) {
  if (!isArray(data) || !isArray(excludedArray)) {
    return data
  }

  let difference = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (!excludedArray.includes(item)) {
      difference.push(item)
    }
  }
  return difference
}
