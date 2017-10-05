import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import AppBar from './components/AppBar'
import AppContent from './components/AppContent'
import Gps from './components/Gps'
import PasteActions from './components/PasteActions'
import Settings from './components/Settings'
import Login from './components/Login'
import Oauth from './components/Oauth'

const Root = ({layout, match}) => (<div className="app">
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/oauth" component={Oauth} />
    <Route path="/home" component={() => (<div style={{
        display: 'flex',
        position: 'relative',
        height: '100%',
        width: '100%',
        paddingTop: 144,
      }}>

      <Settings width={240} />

      <main style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
      }}>
        <AppBar />

        <Route path="/home/route" component={Gps} />

        <AppContent style={{width: '100%'}} />

      </main>
    </div> )} />
  </Switch>

</div>)

const mapStateToProps = state => state.layout
export default withRouter(connect(mapStateToProps)(Root))
