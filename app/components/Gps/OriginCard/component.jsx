import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from 'material-ui'
import { SystemSecAvatar } from '../../SystemSecAvatar'

export const OriginCard = ({system}) => (<Card raised={false} elevation={0}>
  <CardContent>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography type="headline" style={{marginRight: 10}}>
          {system.name}
        </Typography>
        <Typography type="caption">
          <SystemSecAvatar system={system} />
          {system.sec.toFixed(2)}
        </Typography>
      </div>
      <Typography type="caption"> origin</Typography>
    </div>
  </CardContent>
  {/*<CardActions>
    <a href={`http://evemaps.dotlan.net/system/${system.name}`} target="_blank">
      <Button> dotlan </Button>
    </a>

    <a href={`https://zkillboard.com/system/${system.id}/`} target="_blank">
      <Button> zkill </Button>
    </a>

  </CardActions>
  */}
</Card>)
