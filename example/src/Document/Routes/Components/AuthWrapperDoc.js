import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'
import { AuthWrapper } from 'antd-extensions'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'

const CHECKED = [
  {
    auth: 'EDIT',
    id: 1
  },
  {
    auth: 'VIEW',
    id: 2
  }
]

const UN_CHECKED = [
  {
    auth: 'VIEW',
    id: 2
  }
]

class AuthWrapperDoc extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authorities: CHECKED
    }
  }

  _changeAuth = e => {
    this.setState({
      authorities: e.target.checked ? CHECKED : UN_CHECKED
    })
  }

  render() {
    return (
      <React.Fragment>
        <h3>用法</h3>

        <Highlight language="jsx">
          {`// jsx组件使用
<AuthWrapper 
  authorities={Authorities}
  matchKey={MatchKey}
  value={Value}
  noMatch={NoMatch}
>
  <AnotherOtherComponent />
</AuthWrapper>`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'authorities',
              type: 'Array<any>',
              description: (
                <React.Fragment>
                  当前用户拥有的权限列表，如果是
                  <code className="codeRef">Array&lt;String&gt;</code>
                  ，则数组里的任意值与
                  <code className="codeRef">value</code>
                  相同即表示当前包裹组件具备该权限;
                  <br />
                  如果是
                  <code className="codeRef">Array&lt;Object&gt;</code>
                  ，则数组里的任意值的
                  <code className="codeRef">matchKey</code>与<code className="codeRef">value</code>
                  相同即表示当前包裹组件具备该权限;
                </React.Fragment>
              )
            },
            {
              prop: 'value',
              type: 'String',
              description: `当前组件需要的权限值`
            },
            {
              prop: 'matchKey',
              type: 'String',
              description: (
                <React.Fragment>
                  当<code className="codeRef">authorities</code>是<code className="codeRef">Array&lt;Object&gt;</code>
                  时， 必须设置，用以同
                  <code className="codeRef">value</code>
                  做对比
                </React.Fragment>
              )
            },
            {
              prop: 'noMatch',
              type: 'Object',
              description: '当权限不满足时用来展示的内容'
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>

          <Checkbox checked={this.state.authorities === CHECKED} onChange={this._changeAuth}>
            是否具有EDIT权限
          </Checkbox>
          <br />
          <br />
          <AuthWrapper
            value="EDIT"
            authorities={this.state.authorities}
            noMatch={<Input style={{ width: 200 }} disabled placeholder="没权限，能怎么办？" value="" />}
            matchKey="auth"
          >
            <Input style={{ width: 200 }} />
          </AuthWrapper>

          <br />
          <br />

          <Highlight language="jsx">
            {`import React from 'react'
import { Input, Checkbox } from 'antd'
import { AuthWrapper } from 'antd-extensions'

const CHECKED = [
  {
    auth: 'EDIT',
    id: 1
  },
  {
    auth: 'VIEW',
    id: 2
  }
]

const UN_CHECKED = [
  {
    auth: 'VIEW',
    id: 2
  }
]

export default class Example extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      authorities: CHECKED
    }
  }

  _changeAuth = e => {
    this.setState({
      authorities: e.target.checked ? CHECKED : UN_CHECKED
    })
  }

  render() {
    return (
      <AuthWrapper
        value="EDIT"
        authorities={this.state.authorities}
        noMatch={<Input style={{ width: 200 }} disabled placeholder="没权限，能怎么办？" />}
        matchKey="auth"
      >
        <Input style={{ width: 200 }} />
      </AuthWrapper>
      <Checkbox checked={this.state.authorities === CHECKED} onChange={this._changeAuth}>
        是否具有EDIT权限
      </Checkbox>
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

export default withAPIDoc(AuthWrapperDoc)
