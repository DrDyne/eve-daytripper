import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Paper,
  Toolbar,
  Typography,
} from 'material-ui'
import { RoutePath } from './RoutePath'
import { RoutesToFavorites } from './RoutesToFavorites'
import { DestinationCard } from './DestinationCard'
import { ControlInputs } from './ControlInputs'
import { CloseButton as GpsCloseButton } from './CloseButton'
import { ControlInputs as GpsControlInputs } from './ControlInputs'
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
      <Route path="/home/route/:origin" component={withRouter(({match}) => {
        const { origin } = routes.find(utils.byOriginName(match.params.origin))
        return <OriginCard system={origin} />
      })} />

      <Route exact path="/home/route/:origin/:destination" component={withRouter(({match}) => {
        const { destination } = routes.find(utils.byName(match.params.origin, match.params.destination))
        return <DestinationCard system={destination} />
      })} />

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
