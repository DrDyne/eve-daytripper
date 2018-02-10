import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Oauth from './components/CcpAuthenticate/OAuth'
import AppLayout from './AppLayout'
import ProfileLoadingSplashScreen from './components/ProfileLoadingSplashScreen'

const Root = props => (
  <div className="app">
    <ProfileLoadingSplashScreen />

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
          overflowY: 'hidden',
        }}>
          <AppLayout />

        </div>
      )} />

    </Switch>
  </div>
)

export default Root
