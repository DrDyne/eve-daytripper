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

const Root = props => (<div className="app">
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/oauth" component={Oauth} />
    <Route path="/home" render={() => (<div style={{
        display: 'flex',
        position: 'relative',
        height: '100%',
        width: '100%',
      }}>

      <Test open={true} {...props}/>

      {/*
      <main style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
      }}>
        <AppBar />

        <Route path="/home/route" component={Gps} />

        <AppContent style={{width: '100%'}} />

      </main>
      */}
    </div> )} />
  </Switch>

</div>)

const mapStateToProps = state => state.layout
export default withRouter(connect(mapStateToProps)(Root))


import {
  Divider,
  Drawer,
  Toolbar,
} from 'material-ui'
import PasteRecipient from './components/PasteRecipient'
const Test = props => {
  const drawerWidth = 240
  const classes = {
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
    }
  }

  return (<div style={classes.appFrame}>
    <Drawer type="persistent"
      open={true}
      style={{
      position: 'relative',
      height: '100%',
      width: drawerWidth
    }}>
      <div style={{
        width: '100%',
      }}>
        <Toolbar
          disableGutters
          style={{
            width: drawerWidth
        }}>
          close
        </Toolbar>
        <Divider />
        <div style={{
            height: '100%',
            width: drawerWidth
        }}>
          <Settings />
        </div>
      </div>
    </Drawer>

    <main style={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    }}>

      <section>
        <Route path="/home/route" component={() => (<Toolbar disableGutters>
          <Gps />
        </Toolbar>)} />

        <Toolbar disableGutters>
          <PasteRecipient />
        </Toolbar>
      </section>

      <section>
        <AppContent style={{width: '100%'}} />
      </section>
    </main>
  </div>)
}
