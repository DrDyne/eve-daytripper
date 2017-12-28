import React from 'react'
import { Avatar } from 'material-ui'
import { colors, secToHex } from './utils'

export const SystemSecAvatarBig = ({system, label, size}) => (
  <Avatar style={Object.assign({
    backgroundColor: secToHex(system.sec),
  },
    !!size ? { width: size, height: size } : {}
  )}>
    {label}
  </Avatar>
)
