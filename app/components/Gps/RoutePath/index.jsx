import React from 'react'
import {
  Avatar,
  Badge
} from 'material-ui'
import * as utils from '../utils'

export const RoutePath = ({systems}) => {
  const short = utils.shortRoute(systems)
  console.log(short)

  return <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  }}>
    { short.systems.map(s => {
      return <div
        key={`${s.class}:${s.jumps}:${s.systems[0].name}-${s.systems.slice().pop().name}`}
        style={{display: 'flex'}}
      >
      <Badge
        classes={{ badge: utils.secCssId(s.systems.reduce((memo, s) => Math.max(memo, s), 0))}}
        badgeContent={s.class}
      >
        <Avatar className={utils.secCssId(s.worstSec)}>
          {s.jumps}
        </Avatar>
      </Badge>

      </div>
    }) }
  </div>
}
