import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Checkbox } from 'antd'
import { RegionPicker } from 'antd-extensions'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { fetchCountries, fetchStates, fetchCities, fetchDistricts } from '../../../helpers/regionData'

class RegionPickerDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      showLines: 1,
      showDistrict: true,
      value: {
        country: {
          value: 1
        },
        state: {
          value: 3
        },
        city: {
          value: 5
        },
        district: {
          value: 13
        }
      }
    }
  }

  _changeShowLines = e => {
    this.setState({
      showLines: +e.target.value
    })
  }

  _convertData = list => {
    return list.map(r => ({ label: r.name, value: r.id, ...r }))
  }

  render() {
    return (
      <React.Fragment>
        <h3>用法</h3>

        <Highlight language="jsx">
          {`// jsx组件使用
<RegionPicker 
  placeholders={Placeholders}
  showLines={ShowLines}
  showDistrict={ShowDistrict}
  getPopupContainer={GetPopupContainer}
  disabled={Disabled}
  dataRetriever={DataRetriever}
  value={Value}
  onChange={OnChange}
  cache={Cache}
/>`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'placeholders',
              type: 'Object',
              description: (
                <React.Fragment>
                  显示placeholders枚举，默认值：
                  <code className="codeRef">
                    &#123; country: '请选择国家', state: '请选择省', city: '请选择市', district: '请选择区', noData:
                    '无数据' &#125;
                  </code>
                </React.Fragment>
              )
            },
            {
              prop: 'showLines',
              type: 'Number',
              description: (
                <React.Fragment>
                  控制组件按照多少行显示内容，默认
                  <code className="codeRef">1</code>
                  行显示所有下拉选择组件
                </React.Fragment>
              )
            },
            {
              prop: 'showDistrict',
              type: 'Boolean',
              description: '是否显示行政区选择'
            },
            {
              prop: 'disabled',
              type: 'Boolean',
              description: '是否禁用该组件'
            },
            {
              prop: 'getPopupContainer',
              type: 'Function(node: HTMLElement) => HTMLElement',
              description: '默认值：() => document.body'
            },
            {
              prop: 'value',
              type: 'Object',
              description: (
                <React.Fragment>
                  一个包含了预选值内容的对象
                  <code className="codeRef">
                    &#123; country: &#123; value: string &#125;, state: &#123; value: string &#125;, city: &#123; value:
                    string &#125;, district: &#123; value: string &#125; &#125;
                  </code>
                </React.Fragment>
              )
            },
            {
              prop: 'dataRetriever',
              type: 'Function(type: String, prevObj) => Promise<Array<{label: String, value: String}>>',
              description: (
                <React.Fragment>
                  数据抓取函数，接受两个参数，
                  <code className="codeRef">type</code>和<code className="codeRef">prevObj</code>。 其中
                  <br />
                  <code className="codeRef">type</code>
                  可能值是：
                  <code className="codeRef">country</code>,<code className="codeRef">state</code>,
                  <code className="codeRef">city</code>,<code className="codeRef">district</code>;<br />
                  <code className="codeRef">prevObj</code>
                  是前一个下拉区域选择的值。
                  <br />
                  返回值必须是一个
                  <code className="codeRef">
                    Promise&lt;Array&lt;&#123; label: String, value: String &#125;&gt;&gt;
                  </code>
                </React.Fragment>
              )
            },
            {
              prop: 'onChange',
              type: 'Function(val)',
              description: (
                <React.Fragment>
                  选择回调，值为：
                  <code className="codeRef">
                    &#123; country: &#123; value: string &#125;, state?: &#123; value: string &#125;, city?: &#123;
                    value: string &#125;, district?: &#123; value: string &#125; &#125;
                  </code>
                </React.Fragment>
              )
            },
            {
              prop: 'cache',
              type: '{getItem: Function, setItem: Function, clear: Function, removeItem: Function}',
              description: (
                <React.Fragment>
                  数据缓存器，必须是一个类似
                  <code className="codeRef">sessionStorage</code>
                  ，或者
                  <code className="codeRef">localStorage</code>
                  的，
                  <br />
                  实现了
                  <code className="codeRef">
                    &#123; getItem: Function, setItem: Function, clear: Function, removeItem: Function &#125;
                  </code>
                  <br />
                  属性的对象，默认值是：
                  <code className="codeRef">sessionStorage</code>
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>
          <div>
            {this.props.screenWidth > 880 ? (
              <Radio.Group onChange={this._changeShowLines} defaultValue="1">
                <Radio.Button value="1">1行显示</Radio.Button>
                <Radio.Button value="2">2行显示</Radio.Button>
                <Radio.Button value="3">3行显示</Radio.Button>
                <Radio.Button value="4">4行显示</Radio.Button>
              </Radio.Group>
            ) : null}
            &nbsp;&nbsp;&nbsp;
            <Checkbox
              checked={this.state.showDistrict}
              onChange={e =>
                this.setState({
                  showDistrict: e.target.checked
                })
              }
            >
              包含行政区选项
            </Checkbox>
          </div>
          <br />
          <RegionPicker
            value={this.state.value}
            showLines={this.props.screenWidth > 880 ? this.state.showLines : 4}
            showDistrict={this.state.showDistrict}
            dataRetriever={(type, prevObj) => {
              if (type === 'country') {
                return fetchCountries(type).then(this._convertData)
              }
              if (type === 'state') {
                return fetchStates(prevObj.value).then(this._convertData)
              }
              if (type === 'city') {
                return fetchCities(prevObj.value).then(this._convertData)
              }
              if (type === 'district') {
                return fetchDistricts(prevObj.value).then(this._convertData)
              }
            }}
            onChange={val => {
              this.setState({
                value: val
              })
            }}
          />
          <br />
          <p>
            您选择了：
            {JSON.stringify(this.state.value)}
          </p>
          <br />
          <Highlight language="jsx">
            {`import React from 'react'
import { RegionPicker } from 'antd-extensions'

export default class Example extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      showLines: 1,
      showDistrict: true,
      value: {
        country: {
          value: 1
        },
        state: {
          value: 3
        },
        city: {
          value: 5
        },
        district: {
          value: 13
        }
      }
    }
  }

  _changeShowLines = e => {
    this.setState({
      showLines: +e.target.value
    })
  }

  _convertData = list => {
    return list.map(r => ({ label: r.name, value: r.id, ...r }))
  }

  render() {
    return (
      <RegionPicker
        value={this.state.value}
        showLines={this.state.showLines}
        showDistrict={this.state.showDistrict}
        dataRetriever={(type, prevObj) => {
          if (type === 'country') {
            return fetchCountries(type).then(this._convertData)
          }
          if (type === 'state') {
            return fetchStates(prevObj.value).then(this._convertData)
          }
          if (type === 'city') {
            return fetchCities(prevObj.value).then(this._convertData)
          }
          if (type === 'district') {
            return fetchDistricts(prevObj.value).then(this._convertData)
          }
        }}
        onChange={val => {
          this.setState({
            value: val
          })
        }}
      />
    )
  }
}
`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(RegionPickerDoc)
