import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Avatar,
  Divider,
  Drawer,
  Paper,
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
import { Notification as AutoSaveNotification } from './components/AutoSave'

export const AppLayout = props => {
  const drawerWidth = 240
  const { stickyPasteRecipient } = props

  return (
    <div style={{flexGrow: 1}}>
      <div style={{
        display: 'flex',
        width: '100%',
      }}>

        <Switch>
          <Route path="/home/fleet-add" render={() => (
            <div style={{paddingLeft: drawerWidth, width: '100%'}}>
              <CcpAuthenticate />
            </div>
          )} />

          <Route path="/home" render={() => (
            <main style={{
              flexGrow: 1,
              paddingLeft: drawerWidth,
            }}>

              <section>
                <Toolbar disableGutters style={stickyPasteRecipient ? {
                  position: 'fixed',
                  top: 0,
                  left: drawerWidth,
                  right: 0,
                  zIndex: 10,
                } : null }>
                  <PasteRecipient />
                </Toolbar>

                <Toolbar disableGutters style={{
                  paddingTop: stickyPasteRecipient ? 89 : 0,
                }}>
                  <Gps />
                </Toolbar>
              </section>

              <section>
                <AppContent style={{width: '100%'}} />
              </section>

            </main>
          )} />
        </Switch>
      </div>

      <div style={{
        position: 'fixed',
        top: 0,
        width: drawerWidth,
        height: '100vh',
        borderRight: '1px solid #eee',
      }} >
        <Paper style={{
          height: '100%',
          width: drawerWidth
        }}>
          <Settings />
        </Paper>
      </div>

      <AutoSaveNotification />

    </div>
  )
}

AppLayout.defaultProps = {
  stickyPasteRecipient: true
}

const mapStateToProps = ({layout}) => ({
  stickyPasteRecipient: !layout.rideActive
})

export default withRouter(connect(mapStateToProps)(AppLayout))
