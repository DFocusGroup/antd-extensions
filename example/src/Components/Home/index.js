import React from 'react'
import { Row, Col } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row justify="center" type="flex" align="middle" style={{ marginTop: '10px' }}>
          <Col xxl={18} xl={18} lg={22}>
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
            <SyntaxHighlighter language="bash" style={darcula}>
              {`npm install antd-extensions`}
            </SyntaxHighlighter>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Home
