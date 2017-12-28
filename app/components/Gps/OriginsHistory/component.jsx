import React from 'react'
import { Route } from 'react-router-dom'
import {
  Avatar,
  Button,
  Toolbar,
  Typography
} from 'material-ui'
import Tabs, { Tab } from 'material-ui/Tabs'
import {
  SystemSecAvatar,
  SystemSecAvatarBig
} from '../../SystemSecAvatar'

export const OriginsHistory = props => {
  const { origins } = props
  return (
    <Route render={({history}) => (
      <Tabs
        value={false}
        centered={true}
        indicatorColor="primary"
        textColor="primary"
        scrollable
        scrollButtons="auto"
      >
        { origins
          .map(origin => (
            <Tab
              key={origin.id}
              onClick={() => history.push(`/home/nav/${origin.name}`)}
              icon={(
                <SystemSecAvatarBig
                  system={origin}
                  label={origin.wh ? origin.jClass : (
                    origin.sec > 0.4
                    ? 'HS'
                    : origin.sec > 0.0
                    ? 'LS'
                    : 'NS'
                  ) }
                />
              )}
              label={origin.name}
            />
          ))
          .reverse()
        }
      </Tabs>
    )} />
  )

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

const OriginJClass = ({origin}) => (
  <span style={{
    fontSize: 'x-small',
    marginLeft: '0.2em',
    color: '#757575'
  }}>
    / {origin.jClass}
  </span>
)
