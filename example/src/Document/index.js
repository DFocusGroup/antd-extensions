import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import { Layout } from 'antd'
import throttle from 'lodash/throttle'

import Navigation from './Navigation'
import Sidebar from './Sidebar'

import { Routes } from './Routes'

import './index.css'

class Document extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this._resizeHandler = throttle(this._resizeHandler.bind(this), 250)

    this.state = {
      screenWidth: 0
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

  render() {
    const { pathname } = this.props.location
    const padding = this.state.screenWidth <= 1000 ? '5px' : '0 24px 24px'
    if (pathname.startsWith('/api/')) {
      return (
        <Layout>
          <Navigation />
          <Layout>
            <Sidebar />
            <Layout style={{ padding }}>
              <Layout.Content style={{ background: '#fff', padding, margin: 0, minHeight: 900 }}>
                <Routes />
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      )
    }

    return (
      <Layout>
        <Navigation />
        <Layout>
          <Layout style={{ padding }}>
            <Layout.Content style={{ background: '#fff', padding, margin: 0, minHeight: 900 }}>
              <Routes />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Document)
