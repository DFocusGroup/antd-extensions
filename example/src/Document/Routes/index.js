import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../../Components/Home'
import components from './Components'

export class Routes extends Component {
  render() {
    return (
      <Switch>
        {components.map(c => {
          return <Route key={c.url} exact path={c.url} component={c.component} />
        })}
        <Route exact path="/home" component={Home} />
        <Redirect to="/api/timerangepicker" />
      </Switch>
    )
  }
}

export const RawRoutes = [...components]
