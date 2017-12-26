import React from 'react'
import { Route } from 'react-router-dom'
import {
  Button,
  Toolbar,
  Typography
} from 'material-ui'
import {
  SystemSecAvatar
} from '../../SystemSecAvatar'

export const OriginsHistory = props => {
  const { origins } = props

  return (<Toolbar>
    { origins.slice(-6).reverse().map(origin => (
      <Route key={origin.id} render={({history}) => (
        <Button onClick={() => {
          history.push(`/home/nav/${origin.name}`)
        }}>
          <SystemSecAvatar system={origin} />
          {origin.name}

          { !!origin.wh &&
            <span style={{
              fontSize: 'x-small',
              marginLeft: '0.2em',
              color: '#757575'
            }}>
              / {origin.jClass}
            </span>
          }
        </Button>
      )} />
    )) }

    { origins.length > 6 && <Typography type="caption"> ... </Typography> }
    <Typography type="caption"> total: {origins.length} </Typography>
  </Toolbar>)
}
