import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

import { TimeRangePicker } from 'antd-extensions'

import PropsDoc from '../../../Components/PropsDoc'
import { getRouteDefinition } from '../../../helpers/view'
import { debounce } from '../../../helpers/func'

class TimeRangePickerDoc extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      multipleLines: false,
      value: {
        type: 'CUSTOMIZE',
        ranges: [1533081600000, 1534377600000]
      }
    }

    this._resizeHandler = debounce(this._resizeHandler, 200)
  }

  _resizeHandler = () => {
    const width = document.body.clientWidth
    this.setState({
      multipleLines: width < 640
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this._resizeHandler, false)

    this._resizeHandler()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
  }

  _handleChange = value => {
    console.log(`You're selection is ${JSON.stringify(value)}`)
    this.setState({
      value
    })
  }

  render() {
    const { location } = this.props
    const definition = getRouteDefinition(location.pathname)
    if (!definition) {
      return
    }

    return (
      <div>
        <h1>{definition.displayTitle}</h1>
        <p>{definition.description}</p>

        <h3>用法</h3>

        <SyntaxHighlighter language="jsx" style={darcula}>
          {`// jsx组件使用
<TimeRangePicker 
  className={ClassName}
  style={Style}
  labels={Labels}
  value={Value}
  onChange={OnChange}
  disabledDate={DisabledDate}
  multipleLines={MultipleLines}
/>`}
        </SyntaxHighlighter>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'labels',
              type: 'Object',
              description: `显示label枚举，默认值： { BTN_ALL: '全部', BTN_LAST_WEEK: '上周', BTN_LAST_MONTH: '上月', BTN_CUSTOMIZE: '自定义', PLACEHOLDER_START: '起始日期', PLACEHOLDER_END: '截止日期' }`
            },
            {
              prop: 'value',
              type: 'Object',
              description: `默认值，{ type: PropTypes.oneOf(['ALL', 'LAST_WEEK', 'LAST_MONTH', 'CUSTOMIZE']), ranges: [Date, Date] }`
            },
            {
              prop: 'onChange',
              type: 'Function',
              description: '数据变化时的回调函数'
            },
            {
              prop: 'disabledDate',
              type: 'Function',
              description: '针对DatePicker里禁用日期的回调函数'
            },
            {
              prop: 'multipleLines',
              type: 'Boolean',
              description: '是否多行显示，常用于小屏幕时的场景'
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>
          <TimeRangePicker
            style={{ display: 'inline-block' }}
            value={this.state.value}
            onChange={this._handleChange}
            disabledDate={current =>
              current &&
              current >
                moment()
                  .endOf('day')
                  .subtract(1, 'days')
            }
            multipleLines={this.state.multipleLines}
          />
          <br />
          <br />

          <SyntaxHighlighter language="jsx" style={darcula}>
            {`export default class Example extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      value: {
        type: 'CUSTOMIZE',
        ranges: [1533081600000, 1534377600000]
      }
    }
  }

  _handleChange = value => {
    console.log(\`You're selection is \${JSON.stringify(value)}\`)
    this.setState({
      value
    })
  }

  render() {
    return (
      <TimeRangePicker
        value={this.state.value}
        onChange={this._handleChange}
        disabledDate={current =>
          current &&
          current >
            moment()
              .endOf('day')
              .subtract(1, 'days')
        }
      />
    )
  }
}
`}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}

export default withRouter(TimeRangePickerDoc)
