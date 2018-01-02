import React from 'react'
import { Route } from 'react-router-dom'
import {
  Avatar,
  Button,
  Toolbar,
  Typography
} from 'material-ui'
import Tabs, { Tab } from 'material-ui/Tabs'
import DeleteSweepIcon from 'material-ui-icons/DeleteSweep'
import {
  SystemSecAvatar,
  SystemSecAvatarBig
} from '../../SystemSecAvatar'

export const OriginsHistory = props => {
  const { origins, skipOrigins } = props

  return !origins.length ? null : (
    <Route children={({history}) => (
      <Tabs
        value={false}
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
        <Tab
          onClick={() => skipOrigins()}
          disabled={!origins.length}
          icon={<DeleteSweepIcon />}
          label="Clear origins"
        />
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
