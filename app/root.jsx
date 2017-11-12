import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Oauth from './components/Oauth'
import Layout from './Layout'

const Root = props => (<div className="app">
  <Switch>
    <Route exact path="/" component={() => (
      <Redirect to="/login" />

    )} />

    <Route path="/login" component={Login} />

    <Route path="/oauth" component={Oauth} />

    <Route path="/home" render={() => (
      <div style={{
        display: 'flex',
        position: 'relative',
        height: '100%',
        width: '100%',
      }}>
        <Layout open={true} />

      </div>
    )} />

  </Switch>
</div>)

export default Root
