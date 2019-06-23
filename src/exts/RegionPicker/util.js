import { isNil } from '../../helpers/object'

export const BASE_SELECT_STYLE = {
  flexShrink: 0,
  width: 180
}

export function getContainerWidth(showLines, totalElements) {
  if (showLines === 1) {
    return 180 * totalElements + 5 * (totalElements - 1)
  }
  if (showLines === 2) {
    return 180 * 2 + 5
  }
  return 180
}

export function getStyleForSelect(index, showLines, showDistrict) {
  if (index === 1) {
    return Object.assign({}, BASE_SELECT_STYLE, {
      marginRight: [1, 2].includes(showLines) ? '5px' : '',
      marginBottom: [2, 3, 4].includes(showLines) ? '5px' : ''
    })
  }
  if (index === 2) {
    return Object.assign({}, BASE_SELECT_STYLE, {
      marginRight: [1].includes(showLines) ? '5px' : '',
      marginBottom: [2, 3, 4].includes(showLines) ? '5px' : ''
    })
  }

  if (index === 3) {
    return Object.assign({}, BASE_SELECT_STYLE, {
      marginRight: [1, 2].includes(showLines) && showDistrict ? '5px' : '',
      marginBottom: [3, 4].includes(showLines) && showDistrict ? '5px' : ''
    })
  }
}

export function dataValidator(type, list) {
  if (Object.prototype.toString.call(list) !== '[object Array]') {
    throw new Error(`${type} data you provided in dataRetriever must be an array`)
  }
  if (list.some(item => isNil(item.label) || isNil(item.value))) {
    throw new Error(`${type} data you provided in dataRetriever must be Array<{label: string, value: string}>`)
  }
}
