import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import AppBar from './components/AppBar'
import AppContent from './components/AppContent'
import PasteActions from './components/PasteActions'
import Settings from './components/Settings'
import Login from './components/Login'
import Oauth from './components/Oauth'

const Root = ({layout, match}) => (<div className="app">
  <Route path="/login" component={Login} />
  <Route path="/oauth" component={Oauth} />
  <Route path="/route/:origin" component={() => (<div>
    Route origin {match.params.origin}
  </div>)} />
  <Route path="/route/:origin/:destination" component={() => (<div>
    Route origin:{match.params.origin}/destination:{match.params.destination}
  </div>)} />
  <Route path="/home" component={() => (<div style={{
      display: 'flex',
      position: 'relative',
      height: '100%',
      width: '100%',
      paddingTop: 144,
    }}>

    <Settings width={250} />

    <main style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    }}>
      <AppBar />
      <AppContent style={{width: '100%'}} />
    </main>
  </div> )} />

</div>)

const mapStateToProps = state => state.layout
export default connect(mapStateToProps)(withRouter(Root))
