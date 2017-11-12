import React from 'react'
import { Route } from 'react-router-dom'
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

export const AppLayout = props => {
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

      <footer>
        This application has been created under the EVE Developer License Agreement.
      </footer>

    </main>
  </div>)
}

export default AppLayout
