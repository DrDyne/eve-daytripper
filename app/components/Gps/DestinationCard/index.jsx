import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from 'material-ui'

export const DestinationCard = ({system}) => {
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
