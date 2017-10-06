import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Divider,
  Paper,
  Toolbar,
  Typography,
} from 'material-ui'
import { RoutePath } from './RoutePath'
import { RoutesToFavorites } from './RoutesToFavorites'
import { DestinationCard } from './DestinationCard'
import { ControlInputs } from './ControlInputs'
import { CloseButton as GpsCloseButton } from './CloseButton'
import GpsControlInputs from './ControlInputs'
import OriginCard from './OriginCard'
import * as utils from './utils'

export const Gps = props => {
  const { match, favorites, routes, origins, layout } = props

  return (<Paper elevation={8} style={{
    marginBottom: 2
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
      <GpsCloseButton />
    </Toolbar>

    { !!routes.length && (<div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Route path="/home/route/:origin" component={withRouter(({match}) => {
          const { origin } = routes.find(utils.byOriginName(match.params.origin))
          return <OriginCard system={origin} />
        })} />

        <Route exact path="/home/route/:origin/:destination" exact component={withRouter(({match}) => {
          const route = routes.find(utils.byName(match.params.origin, match.params.destination))
          return <div style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
          }}>
            <Paper
              elevation={0}
              style={{
                display: 'flex',
                flexGrow: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
              <Divider style={{display: 'flex', flexGrow: 1}} />
              <RoutePath systems={route.systems} />
              <Divider style={{display: 'flex', flexGrow: 1}} />
            </Paper>
            <DestinationCard system={route.destination} route={route} />
          </div>
        })} />
      </div>


      { !!layout.showFavoriteRoutes &&
      <Route path="/home/route/:origin"
        component={withRouter(({match}) => (
        <RoutesToFavorites
          favorites={favorites}
          routes={routes}
          origin={match.params.origin} />)
        )}
      /> }

      <Route path="/home/route/" exact
        component={() => (<OriginsHistory origins={origins}/>)}
      />
    </div>)}

  </Paper>)
}

const OriginsHistory = props => {
  const { origins } = props
  return <Toolbar>
    <Typography type="body2">
      {origins.length} origins to display
    </Typography>
  </Toolbar>
}
