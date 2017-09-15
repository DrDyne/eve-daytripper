import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import AppBar from './components/AppBar'
import AppContent from './components/AppContent'
import PasteRecipient from './components/PasteRecipient'
import Settings from './components/Settings'
import Login from './components/Login'
import Oauth from './components/Oauth'

const Root = ({layout}) => (<div className="app">
  <Route path="/login" component={Login} />
  <Route path="/oauth" component={Oauth} />
  <Route path="/home" component={() => (<div className="content">
    <div className="app-layout layout-top">
      <AppBar />
    </div>

    <Settings />

    <div className="app-layout app-content">
      <PasteRecipient />
      <AppContent />
    </div>
  </div> )} />

</div>)

const mapStateToProps = state => state.layout
export default connect(mapStateToProps)(withRouter(Root))
