import React, { Component } from 'react'
import { RegionPicker2 } from 'antd-extensions'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { fetchCountries, fetchStates, fetchCities, fetchDistricts } from '../../../helpers/regionData'

class RegionPicker2Doc extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  _convertData = list => {
    return list.map(r => ({ label: r.name, value: r.id, ...r }))
  }

  render() {
    return (
      <React.Fragment>
        <h3>用法</h3>

        <Highlight language="jsx">
          {`// jsx组件使用
<RegionPicker2 
  placeholder={Placeholder}
  disabled={Disabled}
  defaultConstructLevel={DefaultConstructLevel}
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
              prop: 'placeholder',
              type: 'String',
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
              prop: 'defaultConstructLevel',
              type: 'Number',
              description: (
                <React.Fragment>
                  控制组件提供多少级内容，默认
                  <code className="codeRef">4</code>
                  级，即：国家、省、市、区
                </React.Fragment>
              )
            },
            {
              prop: 'disabled',
              type: 'Boolean',
              description: '是否禁用该组件'
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
          <br />
          <RegionPicker2
            style={{ width: '300px' }}
            value={this.state.value}
            defaultConstructLevel={4}
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

  _convertData = list => {
    return list.map(r => ({ label: r.name, value: r.id, ...r }))
  }

  render() {
    return (
      <RegionPicker
        style={{ width: '300px' }}
        value={this.state.value}
        defaultConstructLevel={4}
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

export default withAPIDoc(RegionPicker2Doc)
