import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import AppLayout from './AppLayout'
import ProfileLoadingSplashScreen from './components/ProfileLoadingSplashScreen'
import Ride from './ride'

const Root = ({track}) => (
  <div className="app">
    <Ride />
    <ProfileLoadingSplashScreen />

    <Route path="/" render={(history) => {
      track(history.location.pathname)
      return null
    }} />

    <Switch>
      <Route exact path="/" component={() => (
        <Redirect to="/login" />
      )} />

      <Route path="/login" component={Login} />

      <Route path="/home" render={() => (
        <div style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          width: '100%',
        }}>
          <AppLayout />

        </div>
      )} />

    </Switch>
  </div>
)

Root.defaultProps = {
  track: window.trackPageView
}

export default Root
