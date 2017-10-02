import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from 'material-ui'
import * as utils from '../utils'

export const OriginCard = ({system}) => (
<Card>
  <CardContent>
    <Badge
      classes={{ badge: utils.secCssId(system.sec) }}
      badgeContent={ system.sec.toString().slice(1,3) }
    >
      <Typography type="headline" style={{marginRight: 10}}>
        <small>From:</small> {system.name}
      </Typography>
    </Badge>
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
