import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from 'material-ui'
import { whEffectValues } from 'App/api/utils'
import { SystemSecAvatar } from '../../SystemSecAvatar'
import { WormholeSystemEffectInfo } from './WormholeSystemEffectInfo'

export const OriginCard = ({system}) => (<Card raised={false} elevation={0}>
  <CardContent style={{
    paddingTop: 0,
    paddingBottom: 0
  }} >
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline'
        }} >
          <Typography type="headline" style={{marginRight: 10}}>
            {system.name}
          </Typography>
          {/*
          <TextField
            label="K162"
            style={{
              width: 40,
          }} />
          */}
        </div>
        <Typography type="caption">
          <SystemSecAvatar system={system} />
          { system.wh
          ? system.jClass
          : system.sec.toFixed(2)
          }
        </Typography>
      </div>
    </div>

    { !!system.wh && !!system.effectName &&
      <WormholeSystemEffectInfo system={system}/>
    }
  </CardContent>
</Card>)
