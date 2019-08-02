import { isArray } from '../../helpers/object'

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
