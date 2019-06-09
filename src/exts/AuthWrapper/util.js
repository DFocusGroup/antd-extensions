import { isString } from '../../helpers/object'

export function matchAuth(authorities, matchKey, value) {
  return authorities.some(au => {
    if (isString(au)) {
      return au === value
    }

    if (!matchKey) {
      throw new Error(`matchKey cannot be empty if authorities isn't Array<String>`)
    }

    return au[matchKey] === value || (au.children && matchAuth(au.children, matchKey, value))
  })
}
