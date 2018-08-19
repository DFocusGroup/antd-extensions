import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

import { TimeRangePicker } from 'antd-extensions'

import PropsDoc from '../../../Components/PropsDoc'
import { getRouteDefinition } from '../../../helpers/view'

class TimeRangePickerDoc extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
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
          {`<TimeRangePicker style={Style}  />`}
        </SyntaxHighlighter>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'mapId',
              type: 'String',
              description: '用来指定要打开哪个室内地图'
            },
            {
              prop: 'style',
              type: 'Object',
              description: '指定地图容器样式'
            },
            {
              prop: 'fengmapSDK',
              type: 'Object',
              description: '指定蜂鸟地图SDK'
            },
            {
              prop: 'loadingTxt',
              type: 'String',
              description: '指定蜂鸟地图未加载完毕前的显示文字'
            },
            {
              prop: 'mapOptions',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a
                    href="https://www.fengmap.com/docs/js/v2.1.1_beta/classes/fengmap.MapOptions.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fengmap.MapOptions
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'events',
              type: 'Object',
              description: (
                <React.Fragment>
                  键值组合，key的可用值： [
                  {[
                    'focusGroupIDChanged',
                    'loadComplete',
                    'mapClickNode',
                    'mapScaleLevelChanged',
                    'scaleLevelChanged',
                    'visibleGroupIDsChanged'
                  ].map((e, i) => {
                    return (
                      <span key={i}>
                        <code className="codeRef">{e}</code>
                        {i !== 5 ? ',' : ''}
                      </span>
                    )
                  })}
                  ]，value是事件响应函数
                </React.Fragment>
              )
            },
            {
              prop: 'gestureEnableController',
              type: 'Object',
              description: (
                <React.Fragment>
                  键值组合，key的可用值： [
                  {['enableMapPan', 'enableMapPinch', 'enableMapRotate', 'enableMapIncline'].map((e, i) => {
                    return (
                      <span key={i}>
                        <code className="codeRef">{e}</code>
                        {i !== 3 ? ',' : ''}
                      </span>
                    )
                  })}
                  ]，
                  <code className="codeRef">value</code>
                  是各状态的
                  <code className="codeRef">boolean</code>
                  值。 各<code className="codeRef">key</code>
                  依次表示'禁用平移地图', '禁用缩放地图', '禁用旋转地图', '禁用倾斜地图'
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>
          <TimeRangePicker />
          <br />

          <SyntaxHighlighter language="jsx" style={darcula}>
            {`export default function Example() {
  return (
    <TimeRangePicker />
  )
}
`}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}

export default withRouter(TimeRangePickerDoc)
