import PropTypes from 'prop-types'
import { isString } from '../helpers/object'

function AuthWrapper(props) {
  const { value, children, noMatch, matchKey, authorities } = props

  if (!authorities || !authorities.length) {
    return children
  }

  if (!matchAuth(authorities, matchKey, value)) {
    return noMatch || null
  }

  return children
}

AuthWrapper.propTypes = {
  authorities: PropTypes.array,
  value: PropTypes.string,
  matchKey: PropTypes.string,
  noMatch: PropTypes.object
}

export default AuthWrapper

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
