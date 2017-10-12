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

const mapStateToProps = state => state
export default withRouter(connect(mapStateToProps)(Root))


import {
  Avatar,
  Divider,
  Drawer,
  Toolbar,
  Typography,
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

  const { char } = props

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
          <div style={{
              padding: 5,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Avatar
              alt={char.name}
              src={char.portrait}
              style={{
                width: 64,
                height: 64,
                marginRight: 5,
              }}
              />
            <Typography type="body2">
              {char.name}
            </Typography>
          </div>
        </Toolbar>

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
