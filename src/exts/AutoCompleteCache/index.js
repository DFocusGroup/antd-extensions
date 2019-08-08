import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete, Input } from 'antd'
import { uniqArray, differenceArray } from './util'

/**
 * 实现缓存最新搜索数据的搜索框UI
 * @param  {string} localStorageKey          本地缓存的key值,必须有的属性
 * @param  {number} cacheLength              缓存最近最新搜索的条数，默认十条
 * @param  {string} placeholder              输入框提示语,默认无值undefined
 * @param  {func}   onSearch                 获取选中记录或点击enter，返回输入值
 * @param  {string} size                     'small','middle','large',默认为'large'
 * @param  {bool}   allowClear               清除输入框，默认为true
 * @param  {bool}   defaultActiveFirstOption 是否默认高亮第一个选项,默认不高亮false
 * @param  {object} style                    react dom的style样式语法，默认width: '430px'
 *
 * @return {func(string)}   resetInput       可以在调用处定义refs，
 *         调用refs.current.resetInput设置输入框的值，清空则不传入任何值
 *
 */
class AutoCompleteCache extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cache: [],
      inputVal: null
    }
  }

  componentDidMount() {
    const { localStorageKey } = this.props
    const localStorageStr = localStorage.getItem(localStorageKey)
    const localStorageArr = JSON.parse(localStorageStr) || []
    this.setState({ cache: localStorageArr })
  }

  _onChange = value => {
    this.setState({ inputVal: value })
  }

  _setCatch = value => {
    let text = value
    if (Object.prototype.toString.call(value) === '[object String]') {
      // 输入很多空格控制
      text = value.trim()
    }

    const { localStorageKey, cacheLength = 10 } = this.props
    const { cache } = this.state

    const uniqCache = uniqArray([text].concat(cache))
    const differenceCache = differenceArray(uniqCache, [null, undefined, ''])
    let c = differenceCache
    if (differenceCache.length > cacheLength) {
      c = differenceCache.slice(0, cacheLength)
    }

    this.setState({ cache: c })
    localStorage.setItem(localStorageKey, JSON.stringify(c))
  }

  _onSelect = value => {
    const { onSearch } = this.props
    onSearch && onSearch(value)
    this._setCatch(value)
  }

  _onKeyDown = e => {
    if (e.nativeEvent.keyCode === 13) {
      const { inputVal } = this.state
      const { onSearch } = this.props
      onSearch && onSearch(inputVal)
      this._setCatch(inputVal)
    }
  }

  resetInput = (value = null) => {
    const str = String(value)
    let val = value
    if (value === null || value === undefined || str.trim() === '') {
      val = null
    }

    this._onChange(val)
  }

  render() {
    const { cache, inputVal } = this.state
    const { placeholder, size = 'large', style, allowClear = true, defaultActiveFirstOption = false } = this.props

    return (
      <AutoComplete
        value={inputVal}
        defaultActiveFirstOption={defaultActiveFirstOption}
        allowClear={allowClear}
        size={size}
        onChange={this._onChange}
        onSelect={this._onSelect}
        style={{ width: '430px', ...style }}
        dataSource={cache}
        placeholder={placeholder}
        filterOption={(inputValue, option) =>
          option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Input onKeyDown={this._onKeyDown} />
      </AutoComplete>
    )
  }
}
AutoCompleteCache.propTypes = {
  localStorageKey: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  cacheLength: PropTypes.number,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  allowClear: PropTypes.bool,
  defaultActiveFirstOption: PropTypes.bool
}

export default AutoCompleteCache
