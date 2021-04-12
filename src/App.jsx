import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Router>
    )
  }
}
