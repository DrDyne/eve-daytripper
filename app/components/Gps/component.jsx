import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from 'material-ui'

export const Gps = props => {
  const { match, favorites, routes } = props

  if ( !routes.length ) return null

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

    <Route path="/home/route/:origin" component={withRouter(({match}) => {
      const { origin } = routes.find(byOriginName(match.params.origin))
      return <OriginCard system={origin} />
    })} />

    <Route exact path="/home/route/:origin/:destination" component={withRouter(({match}) => {
      const { destination } = routes.find(byName(match.params.origin, match.params.destination))
      return <DestinationCard system={destination} />
    })} />

    <Route path="/home/route/:origin"
      component={withRouter(({match}) => (<GpsRoutesToFavorites
        favorites={favorites}
        routes={routes}
        origin={match.params.origin} />)
      )}
    />
  </Paper>)
}

const GpsControlInputs = props => (<Switch>
  <Route path="/home/route/:origin" component={ withRouter(({match}) => (<div {...props}>
    <OriginInput value={match.params.origin}/>
    <DestinationInput />
  </div>) )} />

  <Route path="/home/route/:origin/:destination" component={ withRouter(({match}) => (<div {...props}>
    <OriginInput value={match.params.origin}/>
    <DestinationInput value={match.params.destination} />
  </div>) )} />

  <Route path="/home/route" component={() => (<div {...props}>
    <OriginInput />
    <DestinationInput />
  </div>) } />

</Switch>)

import { IconButton } from 'material-ui'
import Close from 'material-ui-icons/Close'
const GpsCloseButton = withRouter(props => {
  const { history } = props
  return <IconButton onClick={() => history.push('/home')}> <Close /> </IconButton>
})

const OriginInput = props => (<TextField
  placeholder={props.placeholder}
  value={props.value}
  label="From"
  style={{ flexGrow: 1 }}
/>)

const DestinationInput = props => (<TextField
  placeholder={props.placeholder}
  value={props.value}
  label="To"
  style={{ flexGrow: 1 }}
/>)

const OriginCard = props => {
  const { system } = props
  return (<Card>
    <CardContent>
      <Typography type="headline">
        origin: {system.name}
      </Typography>
    </CardContent>
    <CardActions>
      <a href={`http://evemaps.dotlan.net/system/${system.name}`} target="_blank">
        <Button> dotlan </Button>
      </a>

      <a href={`https://zkillboard.com/system/${system.id}/`} target="_blank">
        <Button> zkill </Button>
      </a>
    </CardActions>
  </Card>)
}

const DestinationCard = props => {
  const { system } = props
  return (<Card>
    <CardContent>
      <Typography type="headline">
        destination: {system.name}
      </Typography>
    </CardContent>
    <CardActions>
      <a href={`http://evemaps.dotlan.net/system/${system.name}`} target="_blank">
        <Button> dotlan </Button>
      </a>

      <a href={`https://zkillboard.com/system/${system.id}/`} target="_blank">
        <Button> zkill </Button>
      </a>
    </CardActions>
  </Card>)
}

const RouteCard = props => {
  const { route } = props

  return <Card>
    <CardContent>
      <Typography type="headline" component="h2">
        {route.origin.name} {route.systems.length} {route.destination.name}
      </Typography>
      <Typography type="caption"> { route.origin.name} </Typography>
      route goes here
      <Typography type="caption"> { route.destination.name} </Typography>
    </CardContent>
    <CardActions>
      <a href={`http://evemaps.dotlan.net/route/${route.origin.name}:${route.destination.name}`} target="_blank">
        <Button>
          route
        </Button>
      </a>
    </CardActions>
  </Card>
}

const byId = (origin, destination) => route => {
  return origin.id === route.origin.id
  && destination.id === route.destination.id
}

const byName = (originName, destinationName) => route => {
  return originName === route.origin.name
  && destinationName === route.destination.name
}
const byOriginName = name => route => name === route.origin.name

const GpsRoutesToFavorites = props => {
  const { favorites, routes, origin } = props
  console.log(favorites, routes)
  console.log( favorites.map(fav => routes.find(byName(origin, fav.name))) )
  return (<div>
    { favorites.map(fav => routes.find(byName(origin, fav.name)))
      .map(route => <RouteCard key={route.destination.id} route={route} />)
    }
  </div>)
}
