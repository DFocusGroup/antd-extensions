import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'

import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'

const BASE_SELECT_STYLE = {
  flexShrink: 0,
  width: 180
}

const DEFAULT_PLACEHOLDERS = {
  country: '请选择国家',
  state: '请选择省',
  city: '请选择市',
  district: '请选择区',
  noData: '无数据'
}

class RegionPicker extends Component {
  static propTypes = {
    placeholders: PropTypes.shape({
      country: PropTypes.string,
      state: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      noData: PropTypes.string
    }),
    showDistrict: PropTypes.bool,
    showLines: PropTypes.oneOf([1, 2, 3, 4])
    // value: PropTypes.object,
    // onChange: PropTypes.func
  }

  static defaultProps = {
    placeholders: DEFAULT_PLACEHOLDERS,
    showDistrict: true,
    showLines: 1
  }

  constructor(props) {
    super(props)

    this.state = {
      countryLoading: false,
      stateLoading: false,
      cityLoading: false,
      districtLoading: false
    }
  }

  render() {
    const { placeholders, showDistrict, showLines } = this.props

    const finalPlaceholders = Object.assign({}, DEFAULT_PLACEHOLDERS, placeholders)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: getContainerWidth(showLines, showDistrict ? 4 : 3) + 'px'
        }}
      >
        <Select
          style={getStyleForSelect(1, showLines)}
          placeholder={finalPlaceholders.country}
          notFoundContent={this.state.countryLoading ? <Spin size="small" /> : finalPlaceholders.noData}
        />
        <Select
          style={getStyleForSelect(2, showLines)}
          placeholder={finalPlaceholders.state}
          notFoundContent={this.state.stateLoading ? <Spin size="small" /> : finalPlaceholders.noData}
        />
        <Select
          style={getStyleForSelect(3, showLines)}
          placeholder={finalPlaceholders.city}
          notFoundContent={this.state.cityLoading ? <Spin size="small" /> : finalPlaceholders.noData}
        />
        {showDistrict && (
          <Select
            style={BASE_SELECT_STYLE}
            placeholder={finalPlaceholders.district}
            notFoundContent={this.state.districtLoading ? <Spin size="small" /> : finalPlaceholders.noData}
          />
        )}
      </div>
    )
  }
}

export default RegionPicker

function getContainerWidth(showLines, totalElements) {
  if (showLines === 1) {
    return 180 * totalElements + 5 * (totalElements - 1)
  }
  if (showLines === 2) {
    return 180 * 2 + 5
  }
  return 180
}

function getStyleForSelect(index, showLines) {
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
      marginRight: [1, 2].includes(showLines) ? '5px' : '',
      marginBottom: [3, 4].includes(showLines) ? '5px' : ''
    })
  }
}
