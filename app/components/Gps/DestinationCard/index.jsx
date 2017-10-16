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

export const DestinationCard = ({system}) => (<Card elevation={0} raised={false}>
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
        <Typography type="caption" style={{marginRight: 10}}>
          <SystemSecAvatar system={system} />
          {system.sec.toFixed(2)}
        </Typography>
      </div>
    </div>
  </CardContent>
</Card>)
