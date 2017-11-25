import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Avatar,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from 'material-ui'
import AppBar from './components/AppBar'
import AppContent from './components/AppContent'
import Gps from './components/Gps'
import PasteRecipient from './components/PasteRecipient'
import PasteActions from './components/PasteActions'
import Settings from './components/Settings'
import CcpAuthenticate from './components/CcpAuthenticate'

export const AppLayout = props => {
  const drawerWidth = 240
  const classes = {
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
    }
  }

  return (<div style={classes.appFrame}>
    <div
      style={{
        position: 'relative',
        width: drawerWidth,
        background: 'white',
        height: '100vh',
      }}
    >
      <div style={{
        width: '100%',
      }}>

        <div style={{
          height: '100vh',
          width: drawerWidth
        }}>
          <Settings />
        </div>
      </div>
    </div>

    <Switch>
      <Route path="/home/fleet-add" render={CcpAuthenticate} />

      <Route path="/home" render={() => (
        <main style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100vh',
          overflowY: 'auto'
        }}>

          <section>
            <Toolbar disableGutters>
              <PasteRecipient />
            </Toolbar>

            <Route path="/home" component={() => (
              <Toolbar disableGutters>
                <Gps />
              </Toolbar>
            )} />
          </section>

          <section>
            <AppContent style={{width: '100%'}} />
          </section>

        </main>
      )} />
    </Switch>
  </div>)
}

export default AppLayout
