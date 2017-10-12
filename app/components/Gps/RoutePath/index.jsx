import React from 'react'
import {
  Avatar,
  Badge,
  Typography
} from 'material-ui'
import * as utils from '../utils'

export const RoutePath = ({systems}) => {
  const short = utils.shortRoute(systems)

  return <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
  }}>
    { short.systems.map(s => {
      return <div
        key={`${s.class}:${s.jumps}:${s.systems[0].name}-${s.systems.slice().pop().name}`}
        style={{
          display: 'flex',
          width: '1.8em',
          flexDirection: 'column-reverse',
          alignItems: 'center',
        }}
      >
        <Typography type="body2">
          {s.class}
        </Typography>

        <Avatar className={utils.secCssId(s.worstSec)}>
          {s.jumps}
        </Avatar>
      </div>
    }) }
  </div>
}
