import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { AppBar } from './components/AppBar'

const Root = () => (<div className="app">
  <div className="content">
    <Route path="/login" component={() => <div> TODO: login </div>} />
    <Route path="/home" component={() => <div> TODO: home </div>} />
  </div>
</div>)

export default withRouter(Root)
