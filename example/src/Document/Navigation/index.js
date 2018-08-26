import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import throttle from 'lodash/throttle'
import { Layout, Drawer, Menu } from 'antd'
import { RawRoutes } from '../Routes'

import './index.css'
import logoURL from '../../assets/antd.svg'

class Navigation extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this._resizeHandler = throttle(this._resizeHandler.bind(this), 250)

    this.state = {
      screenWidth: 0,
      openSmallScreenMenu: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resizeHandler)
    this._resizeHandler()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
  }

  _resizeHandler() {
    this.setState({
      screenWidth: window.innerWidth
    })
  }

  _toggleSmallScreenMenu = () => {
    if (this.state.screenWidth > 1000) {
      return
    }

    this.setState({
      openSmallScreenMenu: !this.state.openSmallScreenMenu
    })
  }

  _selectMenu = ({ item, key, selectedKeys }) => {}

  render() {
    const inSmallScreen = this.state.screenWidth <= 470

    const { location } = this.props

    const selectedKey = location.pathname.startsWith('/api/') ? '/api/timerangepicker' : '/home'

    return (
      <Layout.Header
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: `0px ${inSmallScreen ? '10px' : '50px'}`
        }}
      >
        <a href="https://github.com/DFocusFE/antd-extensions">
          <img
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 0
            }}
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          />
        </a>
        <div>
          <img src={logoURL} className="headerLogo" alt="" onClick={this._toggleSmallScreenMenu} />
          <span className="headerTitle">{inSmallScreen ? 'antd-exts' : 'antd-extensions'}</span>
        </div>
        <Menu
          mode="horizontal"
          style={{ marginLeft: inSmallScreen ? '10px' : '30px', lineHeight: '65px' }}
          onSelect={this._selectMenu}
          selectedKeys={[selectedKey]}
        >
          <Menu.Item key="/home">
            <Link to="/home">入门</Link>
          </Menu.Item>
          <Menu.Item key="/api/timerangepicker">
            <Link to="/api/timerangepicker">文档</Link>
          </Menu.Item>
        </Menu>
        <Drawer
          title="文档"
          placement="left"
          closable
          onClose={() =>
            this.setState({
              openSmallScreenMenu: false
            })
          }
          visible={this.state.openSmallScreenMenu}
        >
          {RawRoutes.map(c => {
            return (
              <div key={c.url} className="smallScreenMenuItem">
                <Link
                  to={c.url}
                  onClick={() =>
                    this.setState({
                      openSmallScreenMenu: false
                    })
                  }
                >
                  {c.displayTitle}
                </Link>
              </div>
            )
          })}
        </Drawer>
      </Layout.Header>
    )
  }
}

export default withRouter(Navigation)
