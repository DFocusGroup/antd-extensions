import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import { TimeRangePicker } from 'antd-extensions'

import withAPIDoc from '../../../Components/APIDoc'
import Highlight from '../../../Components/Highlight'
import PropsDoc from '../../../Components/PropsDoc'

class TimeRangePickerDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
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
  }

  _handleChange = value => {
    console.log(`You're selection is ${JSON.stringify(value)}`)
    this.setState({
      value
    })
  }

  render() {
    const { screenWidth } = this.props
    const multipleLines = screenWidth < 640

    return (
      <React.Fragment>
        <h3>用法</h3>

        <Highlight language="jsx">
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
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'labels',
              type: 'Object',
              description: `显示label枚举，默认值： { BTN_ALL: '全部', BTN_LAST_WEEK: '上周', BTN_LAST_MONTH: '上月', 
              BTN_CUSTOMIZE: '自定义', PLACEHOLDER_START: '起始日期', PLACEHOLDER_END: '截止日期' }`
            },
            {
              prop: 'value',
              type: 'Object',
              description: `默认值，{ type: PropTypes.oneOf(['ALL', 'LAST_WEEK', 'LAST_MONTH', 'CUSTOMIZE']), 
              ranges: [Date, Date] }`
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
            multipleLines={multipleLines}
          />
          <br />
          <br />
          <p>您已选择： [ {this.state.value.ranges.map(r => moment(r).format('YYYY-MM-DD HH:mm:ss')).join(', ')} ]</p>
          <br />

          <Highlight language="jsx">
            {`import React from 'react'
import { TimeRangePicker } from 'antd-extensions'

export default class Example extends React.Component {
  
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
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({ app }) => {
  return {
    screenWidth: app.screenWidth
  }
})(withAPIDoc(TimeRangePickerDoc))
