import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, Spin } from 'antd'
import { BASE_SELECT_STYLE, getContainerWidth, getStyleForSelect, dataValidator } from './util'

import 'antd/lib/select/style/css'
import 'antd/lib/spin/style/css'

const DEFAULT_PLACEHOLDERS = {
  country: '请选择国家',
  state: '请选择省',
  city: '请选择市',
  district: '请选择区',
  noData: '无数据'
}

const STORAGE_PROPS = ['getItem', 'setItem', 'clear', 'removeItem']

const STORAGE_PREFIX = 'antd-extensions-'

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
    getPopupContainer: PropTypes.func,
    disabled: PropTypes.bool,
    showLines: PropTypes.oneOf([1, 2, 3, 4]),
    dataRetriever: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.object,
    cache(props, propName, componentName) {
      const prop = props[propName]
      if (prop === undefined || prop === false) {
        return null
      }

      if (STORAGE_PROPS.every(p => prop && prop[p])) {
        return null
      }
      throw new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`)
    }
  }

  static defaultProps = {
    placeholders: DEFAULT_PLACEHOLDERS,
    showDistrict: true,
    disabled: false,
    showLines: 1,
    cache: window.sessionStorage
  }

  constructor(props) {
    super(props)

    this.state = {
      countryLoading: false,
      stateLoading: false,
      cityLoading: false,
      districtLoading: false,
      countryList: null,
      stateList: null,
      cityList: null,
      districtList: null,
      countryValue: undefined,
      stateValue: undefined,
      cityValue: undefined,
      districtValue: undefined
    }

    this.isUnmount = false
  }

  componentDidMount() {
    this._retrieveData('country')
  }

  componentWillUnmount() {
    this.isUnmount = true
  }

  _retrieveData = (type, parent) => {
    const { dataRetriever, cache } = this.props
    if (!dataRetriever || this.isUnmount) {
      return
    }

    if (type !== 'country' && !parent) {
      return
    }

    this.setState({
      [`${type}Loading`]: true
    })

    let response = null
    const storageKey = `${STORAGE_PREFIX}${type}-${parent ? parent.value : ''}`

    if (cache) {
      response = cache.getItem(storageKey)
      response = !response ? dataRetriever(type, parent) : Promise.resolve(JSON.parse(response))
    } else {
      response = dataRetriever(type, parent)
    }

    if (!response || !response.then) {
      throw new Error(
        'dataRetriever you provided is not valid, it should return a Promise<Array<{label: string, value: string}>>'
      )
    }

    response.then(res => {
      if (this.isUnmount || !res) {
        return
      }
      dataValidator(type, res)
      if (cache) {
        cache.setItem(storageKey, JSON.stringify(res))
      }
      this.setState(
        {
          [`${type}Loading`]: false,
          [`${type}List`]: res
        },
        () => {
          this._setDefaultValue(type)
        }
      )
    })
  }

  _setDefaultValue = type => {
    const { value } = this.props
    if (!value || !value[type]) {
      return
    }
    if (type === 'country') {
      this._retrieveData('state', this._findByVal(this.state.countryList, value[type].value))
    }
    if (type === 'state') {
      this._retrieveData('city', this._findByVal(this.state.stateList, value[type].value))
    }
    if (type === 'city') {
      this._retrieveData('district', this._findByVal(this.state.cityList, value[type].value))
    }
    this.setState({
      [`${type}Value`]: value[type].value
    })
  }

  _onSelectChange = (type, val) => {
    this._exposeValue(type, val)

    if (type === 'country') {
      this.setState({
        countryValue: val,
        stateValue: undefined,
        cityValue: undefined,
        districtValue: undefined,
        stateList: null,
        cityList: null,
        districtList: null
      })
      this._retrieveData('state', this._findByVal(this.state.countryList, val))
    }
    if (type === 'state') {
      this.setState({
        stateValue: val,
        cityValue: undefined,
        districtValue: undefined,
        cityList: null,
        districtList: null
      })
      this._retrieveData('city', this._findByVal(this.state.stateList, val))
    }
    if (type === 'city') {
      this.setState({
        cityValue: val,
        districtValue: undefined,
        districtList: null
      })
      if (this.state.cityList) {
        this._retrieveData('district', this._findByVal(this.state.cityList, val))
      }
    }

    if (type === 'district') {
      this.setState({
        districtValue: val
      })
    }
  }

  _exposeValue = (type, val) => {
    const { onChange } = this.props
    if (!onChange) {
      return
    }
    if (type === 'country') {
      return onChange({
        country: this._findByVal(this.state.countryList, val)
      })
    }
    if (type === 'state') {
      return onChange({
        country: this._findByVal(this.state.countryList, this.state.countryValue),
        state: this._findByVal(this.state.stateList, val)
      })
    }
    if (type === 'city') {
      return onChange({
        country: this._findByVal(this.state.countryList, this.state.countryValue),
        state: this._findByVal(this.state.stateList, this.state.stateValue),
        city: this._findByVal(this.state.cityList, val)
      })
    }
    if (type === 'district') {
      return onChange({
        country: this._findByVal(this.state.countryList, this.state.countryValue),
        state: this._findByVal(this.state.stateList, this.state.stateValue),
        city: this._findByVal(this.state.cityList, this.state.cityValue),
        district: this._findByVal(this.state.districtList, val)
      })
    }
  }

  _findByVal = (list, val) => {
    return list.find(c => `${c.value}` === `${val}`)
  }

  render() {
    const { placeholders, showDistrict, showLines, disabled, getPopupContainer } = this.props

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
          disabled={disabled}
          value={this.state.countryValue}
          getPopupContainer={getPopupContainer}
          showSearch
          style={getStyleForSelect(1, showLines, showDistrict)}
          placeholder={finalPlaceholders.country}
          notFoundContent={this.state.countryLoading ? <Spin size="small" /> : finalPlaceholders.noData}
          onChange={val => this._onSelectChange('country', val)}
        >
          {this.state.countryList &&
            this.state.countryList.map(c => {
              return (
                <Select.Option key={c.value} value={c.value}>
                  {c.label}
                </Select.Option>
              )
            })}
        </Select>
        <Select
          disabled={disabled}
          value={this.state.stateValue}
          getPopupContainer={getPopupContainer}
          showSearch
          style={getStyleForSelect(2, showLines, showDistrict)}
          placeholder={finalPlaceholders.state}
          notFoundContent={this.state.stateLoading ? <Spin size="small" /> : finalPlaceholders.noData}
          onChange={val => this._onSelectChange('state', val)}
        >
          {this.state.stateList &&
            this.state.stateList.map(c => {
              return (
                <Select.Option key={c.value} value={c.value}>
                  {c.label}
                </Select.Option>
              )
            })}
        </Select>
        <Select
          disabled={disabled}
          value={this.state.cityValue}
          getPopupContainer={getPopupContainer}
          showSearch
          style={getStyleForSelect(3, showLines, showDistrict)}
          placeholder={finalPlaceholders.city}
          notFoundContent={this.state.cityLoading ? <Spin size="small" /> : finalPlaceholders.noData}
          onChange={val => this._onSelectChange('city', val)}
        >
          {this.state.cityList &&
            this.state.cityList.map(c => {
              return (
                <Select.Option key={c.value} value={c.value}>
                  {c.label}
                </Select.Option>
              )
            })}
        </Select>
        {showDistrict && (
          <Select
            disabled={disabled}
            value={this.state.districtValue}
            getPopupContainer={getPopupContainer}
            showSearch
            style={BASE_SELECT_STYLE}
            placeholder={finalPlaceholders.district}
            notFoundContent={this.state.districtLoading ? <Spin size="small" /> : finalPlaceholders.noData}
            onChange={val => this._onSelectChange('district', val)}
          >
            {this.state.districtList &&
              this.state.districtList.map(c => {
                return (
                  <Select.Option key={c.value} value={c.value}>
                    {c.label}
                  </Select.Option>
                )
              })}
          </Select>
        )}
      </div>
    )
  }
}

export default RegionPicker
