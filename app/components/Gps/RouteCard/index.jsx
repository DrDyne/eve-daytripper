import React from 'react'
import {
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
} from 'material-ui'
import StarBorder from 'material-ui-icons/StarBorder'
import { RoutePath } from '../RoutePath'

export const RemoveFromFavoritesButton = ({system}) => (
  <IconButton onClick={() => confirmRemoveFromFavorites(route.destination)}>
    <StarBorder />
  </IconButton>
)

export const RouteCard = ({route}) => <Card>
  <CardContent>
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }}>
      <Typography type="headline" component="h2">
        {route.origin.name}
      </Typography>

      <Typography type="headline" component="h2">
        {route.jumps}
      </Typography>

      <Typography type="headline" component="h2">
        {route.destination.name}
      </Typography>
    </div>

    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Typography type="caption" style={{marginBottom: 6}}> { route.origin.name} </Typography>
      <RoutePath systems={route.systems} />
      <Typography type="caption" style={{textAlign: 'right'}}> { route.destination.name} </Typography>
    </div>
  </CardContent>
  <CardActions>
    <a href={`http://evemaps.dotlan.net/route/${route.origin.name}:${route.destination.name}`} target="_blank">
      <Button>
        route
      </Button>
    </a>
    <RemoveFromFavoritesButton system={route.destination} />
  </CardActions>
</Card>
