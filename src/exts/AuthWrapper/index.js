import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import { matchAuth } from './util'

import 'antd/lib/tooltip/style/css'

function AuthWrapper(props) {
  const { value, children, noMatch, noMatchFeedback, matchKey, authorities } = props

  if (!authorities || !authorities.length) {
    if (!noMatch) {
      return null
    }
    return noMatch
  }

  if (matchAuth(authorities, matchKey, value)) {
    return children
  }

  if (!noMatch) {
    return null
  }

  if (!noMatchFeedback) {
    return noMatch
  }

  return <Tooltip title={noMatchFeedback}>{noMatch}</Tooltip>
}

AuthWrapper.propTypes = {
  authorities: PropTypes.array,
  value: PropTypes.string,
  matchKey: PropTypes.string,
  noMatch: PropTypes.object,
  noMatchFeedback: PropTypes.string,
  children: PropTypes.any
}

export default AuthWrapper
