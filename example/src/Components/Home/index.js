import React from 'react'
import { Row, Col } from 'antd'

import Highlight from '../Highlight'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row justify="center" type="flex" align="middle" style={{ marginTop: '10px' }}>
          <Col xxl={18} xl={18} lg={22} xs={23}>
            <div id="github" style={{ display: 'flex' }}>
              <span>热烈欢迎您的star &nbsp;&nbsp;</span>
              <iframe
                title="star"
                src="https://ghbtns.com/github-btn.html?user=DFocusFE&repo=antd-extensions&type=star&count=true"
                frameBorder="0"
                width="100"
                height="20"
              />
              <iframe
                title="fork"
                src="https://ghbtns.com/github-btn.html?user=DFocusFE&repo=antd-extensions&type=fork&count=true"
                frameBorder="0"
                width="100"
                height="20"
              />
            </div>
            <br />
            <h1>关于</h1>
            <p>
              这是一个从
              <a href="http://www.dfocuspace.com/">DFocus</a>
              产品里提炼出的一组基于
              <a href="https://ant.design/">ant-design</a>
              的扩展组件集合。如果您也在使用
              <a href="https://ant.design/">ant-design</a>
              ，这里或许也有一些您需要的组件哦！
            </p>
            <h1>安装</h1>
            <Highlight language="bash">{`npm install antd-extensions`}</Highlight>
            <h1>引入</h1>
            <Highlight language="jsx">{`import { TimeRangePicker, InputDialog } from 'antd-extensions'`}</Highlight>
            <h1>使用</h1>
            <Highlight language="jsx">
              {`// 日期区间选择器
import React, { Component } from 'react'
import { TimeRangePicker } from 'antd-extensions'

class Example extends Component {
  constructor(props) {
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
        labels={{
          BTN_ALL: 'All',
          BTN_LAST_WEEK: 'Last week',
          BTN_LAST_MONTH: 'Last month',
          BTN_CUSTOMIZE: 'Customize',
          PLACEHOLDER_START: 'Start',
          PLACEHOLDER_END: 'End'
        }}
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
}`}
            </Highlight>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Home
