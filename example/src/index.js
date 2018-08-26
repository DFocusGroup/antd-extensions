import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { destoryGlobalSpinner } from './helpers/view'

import Document from './Document'

ReactDOM.render(
  <HashRouter>
    <Document />
  </HashRouter>,
  document.getElementById('root')
)

destoryGlobalSpinner()
