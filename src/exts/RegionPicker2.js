import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Cascader } from 'antd'
import { isNil, omit } from '../helpers/object'

import 'antd/lib/cascader/style/css'

const TYPES = ['country', 'state', 'city', 'district']

const STORAGE_PROPS = ['getItem', 'setItem', 'clear', 'removeItem']

const STORAGE_PREFIX = 'antd-extensions-'

class RegionPicker2 extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    defaultConstructLevel: PropTypes.oneOf([1, 2, 3, 4]),
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
    placeholder: '请选择区域信息',
    defaultConstructLevel: 4,
    cache: window.sessionStorage
  }

  constructor(props) {
    super(props)

    this.state = {
      options: null,
      internalVal: this._getFinalValue(props.value)
    }

    this.isUnmount = false
  }

  componentDidMount() {
    this._retrieveData()
  }

  componentWillUnmount() {
    this.isUnmount = true
  }

  _retrieveData = selectedOptions => {
    const { dataRetriever, cache, defaultConstructLevel } = this.props
    if (!dataRetriever || this.isUnmount) {
      return
    }
    const currentType = !selectedOptions ? 'country' : TYPES[selectedOptions.length]

    if (TYPES.indexOf(currentType) < 0 || TYPES.indexOf(currentType) > defaultConstructLevel - 1) {
      return
    }
    if (currentType !== 'country' && !selectedOptions) {
      return
    }

    const parent = !selectedOptions ? null : selectedOptions[selectedOptions.length - 1]
    if (parent) {
      parent.loading = true
    }

    let response = null
    const storageKey = `${STORAGE_PREFIX}${currentType}-${parent ? parent.value : ''}`

    if (cache) {
      response = cache.getItem(storageKey)
      response = !response ? dataRetriever(currentType, parent) : Promise.resolve(JSON.parse(response))
    } else {
      response = dataRetriever(currentType, parent)
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
      dataValidator(currentType, res)
      if (cache) {
        cache.setItem(storageKey, JSON.stringify(res))
      }
      if (TYPES.indexOf(currentType) < defaultConstructLevel - 1) {
        res.forEach(r => (r.isLeaf = false))
      }
      if (parent) {
        parent.loading = false
        parent.children = res
      }

      return this.setState(
        {
          options: !selectedOptions ? res : [...this.state.options]
        },
        () => {
          this._setDefaultValue(currentType, res)
        }
      )
    })
  }

  _setDefaultValue = (type, parent) => {
    const { value } = this.props
    const { options } = this.state
    if (!value || !value[type]) {
      return
    }
    if (type === 'country') {
      const found = this._findByVal(options, value[type].value)
      if (found) {
        this._retrieveData([found])
      }
    }
    if (type === 'state') {
      const found = this._findByVal(parent, value[type].value)
      if (found) {
        this._retrieveData([0, found])
      }
    }
    if (type === 'city') {
      const found = this._findByVal(parent, value[type].value)
      if (found) {
        this._retrieveData([0, 1, found])
      }
    }
  }

  _onSelectChange = (value, selectedOptions) => {
    const { onChange, defaultConstructLevel } = this.props
    const { options } = this.state
    this.setState({
      internalVal: value
    })
    if (!onChange) {
      return
    }
    if (!value || (value.length > 0 && value.length < defaultConstructLevel)) {
      return
    }
    if (value.length === 0) {
      onChange(null)
      return
    }
    const output = {}
    let lastOptions = options

    for (let i = 0; i < defaultConstructLevel; i++) {
      const val = value[i]
      const type = TYPES[i]
      const found = this._findByVal(lastOptions, val)
      lastOptions = found.children
      output[type] = omit(found, ['children'])
    }
    onChange(output)
  }

  _findByVal = (list, val) => {
    return list.find(c => `${c.value}` === `${val}`)
  }

  _getFinalValue = value => {
    if (!value) {
      return []
    }
    const { defaultConstructLevel } = this.props
    const vals = []

    for (let i = 0; i < defaultConstructLevel; i++) {
      const type = TYPES[i]
      const val = value[type]
      if (val && val.value) {
        vals.push(val.value)
      }
    }
    return vals
  }

  render() {
    const { className, style, placeholder } = this.props
    const { options, internalVal } = this.state
    return (
      <Cascader
        className={className}
        style={style}
        placeholder={placeholder}
        options={options}
        value={internalVal}
        loadData={this._retrieveData}
        onChange={this._onSelectChange}
        changeOnSelect
      />
    )
  }
}

export default RegionPicker2

function dataValidator(type, list) {
  if (Object.prototype.toString.call(list) !== '[object Array]') {
    throw new Error(`${type} data you provided in dataRetriever must be an array`)
  }
  if (list.some(item => isNil(item.label) || isNil(item.value))) {
    throw new Error(`${type} data you provided in dataRetriever must be Array<{label: string, value: string}>`)
  }
}
