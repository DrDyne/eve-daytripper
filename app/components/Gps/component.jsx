import React from 'react'
import { Route } from 'react-router-dom'
import { Paper, Toolbar } from 'material-ui'
import GpsControlInputs from './ControlInputs'
import GpsCloseButton from './CloseButton'
import GpsContent from './Content'
import OriginsHistory from './OriginsHistory'
import * as utils from './utils'

export const Gps = () => (
  <Paper id="edt-gps" style={{
    marginBottom: 4,
    width: '100%',
  }}>
    <Toolbar style={{
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'stretch',
    }}>
      <GpsControlInputs style={{
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'center',
      }} />
      <Route path="/home/nav" component={GpsCloseButton} />
    </Toolbar>

    <Route path="/home" component={OriginsHistory} />

    <GpsContent />

  </Paper>
)
