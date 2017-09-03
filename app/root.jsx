import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import AppBar from './components/AppBar'
import AppContent from './components/AppContent'
import PasteRecipient from './components/PasteRecipient'
import Settings from './components/Settings'

const Root = ({layout}) => (<div className="app">
  <div className="app-layout layout-top">
    <AppBar />
  </div>

  <Settings />

  <div className="app-layout app-content">
    <PasteRecipient />
    <AppContent />
  </div>

  <div className="content">
    <Route path="/login" component={() => <div> TODO: login </div>} />
    <Route path="/home" component={() => <div> TODO: home </div>} />
  </div>
</div>)

const mapStateToProps = state => state.layout
export default connect(mapStateToProps)(withRouter(Root))
