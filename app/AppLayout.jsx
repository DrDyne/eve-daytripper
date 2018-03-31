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
import { Notification as AutoSaveNotification } from './components/AutoSave'

export const AppLayout = props => {
  const drawerWidth = 240

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      width: '100%',
    }}>
      <AutoSaveNotification />

      <Switch>
        <Route path="/home/fleet-add" render={CcpAuthenticate} />

        <Route path="/home" render={() => (
          <main style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '100vh',
            overflowY: 'auto',
            paddingLeft:  drawerWidth
          }}>

            <section>
              <Toolbar disableGutters style={{
                display: 'initial',
                position: 'fixed',
                top: 0,
                left: drawerWidth,
                right: 0,
                zIndex: 10,
              }}>
                <PasteRecipient />
              </Toolbar>

              <Route path="/home" component={() => (
                <Toolbar disableGutters style={{paddingTop: 89}}>
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

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'white',
        height: '100vh',
        borderRight: '1px solid #eee',
      }} >


        <div style={{
          width: drawerWidth,
        }}>
          <Settings />
        </div>
      </div>

    </div>
  )
}

export default AppLayout
