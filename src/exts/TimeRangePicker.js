import React from 'react'
import PropTypes from 'prop-types'

class TimeRangePicker extends React.Component {
  static propTypes = {
    type: PropTypes.string
  }

  render() {
    return <div>{this.props.type}</div>
  }
}

export default TimeRangePicker
