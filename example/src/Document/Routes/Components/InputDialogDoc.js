import React, { Component } from 'react'
import { Button } from 'antd'
import { InputDialog } from 'antd-extensions'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'

class InputDialogDoc extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      value: ''
    }
  }

  toggleDialog = bool => {
    this.setState({
      visible: bool
    })
  }

  confirm = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
        this.toggleDialog(false)
      }, 2000)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h3>用法</h3>

        <Highlight language="jsx">
          {`// jsx组件使用
<InputDialog 
  labels={Labels}
  value={Value}
  onConfirm={OnChange}
  onCancel={DisabledDate}
  multipleLines={MultipleLines}
  validator={Validator}
  visible={Visible}
/>`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'labels',
              type: 'Object',
              description: (
                <React.Fragment>
                  显示label枚举，默认值：
                  <code className="codeRef">
                    &#123; title: '确认输入内容', subTitle: undefined, placeholder: undefined, confirm: '确认', cancel:
                    '取消' &#125;
                  </code>
                </React.Fragment>
              )
            },
            {
              prop: 'value',
              type: 'String',
              description: `输入框的默认值`
            },
            {
              prop: 'maskClosable',
              type: 'Boolean',
              description: '点击模态框周围是否关闭触发模态框关闭操作'
            },
            {
              prop: 'visible',
              type: 'Boolean',
              description: '模态框显示状态'
            },
            {
              prop: 'validator',
              type: 'Function',
              description: (
                <React.Fragment>
                  自定义校验（注意，callback 必须被调用），
                  <code className="codeRef">function(value, callback)</code>
                </React.Fragment>
              )
            },
            {
              prop: 'onConfirm',
              type: 'Function => void || Promise',
              description: (
                <React.Fragment>
                  输入内容满足了
                  <code className="codeRef">validator</code>
                  后会被调用
                </React.Fragment>
              )
            },
            {
              prop: 'onCancel',
              type: 'Function',
              description: (
                <React.Fragment>
                  点击取消按钮，或者
                  <code className="codeRef">maskClosable = true</code>
                  时点击模态框周围时触发
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>
          <InputDialog
            visible={this.state.visible}
            value={this.state.value}
            labels={{ title: '确认删除吧', subTitle: '请键入 “你好”' }}
            onCancel={() => this.toggleDialog(false)}
            onConfirm={this.confirm}
            validator={(val, cb) => {
              if (val === '你好') {
                return cb()
              }
              return cb('您输入的内容不正确')
            }}
          />
          <Button onClick={() => this.toggleDialog(true)}>打开确认输入对话框</Button>

          <br />
          <br />

          <Highlight language="jsx">
            {`import React from 'react'
import { Button } from 'antd'
import { InputDialog } from 'antd-extensions'

export default class Example extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      visible: false,
      value: ''
    }
  }

  toggleDialog = bool => {
    this.setState({
      visible: bool
    })
  }

  confirm = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
        this.toggleDialog(false)
      }, 2000)
    })
  }

  render() {
    return (
      <div>
        <InputDialog
          visible={this.state.visible}
          value={this.state.value}
          labels={{ title: '确认删除吧', subTitle: '请键入 “你好”' }}
          onCancel={() => this.toggleDialog(false)}
          onConfirm={this.confirm}
          validator={(val, cb) => {
            if (val === '你好') {
              return cb()
            }
            return cb('您输入的内容不正确')
          }}
        />
        <Button onClick={() => this.toggleDialog(true)}>打开确认输入对话框</Button>
      </div>
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

export default withAPIDoc(InputDialogDoc)
