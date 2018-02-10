import React from 'react'
import { colors, secToHex } from './utils'

export const SystemSecAvatar = ({system, size}) => (
  <span style={{
    width: size || 10,
    height: size || 10,
    borderRadius: size || 10,
    backgroundColor: secToHex(system.sec),
    display: 'inline-block',
    marginRight: 5,
    marginLeft: -10,
  }} />
)

import { Avatar } from 'material-ui'
export const SystemSecAvatarBig = ({ system, label, size, thin, style }) => (
  <Avatar {...{ style }} style={Object.assign({
    backgroundColor: secToHex(system.sec),
  },
    !!size ? { width: size, height: size } : {},
    !!thin ? { fontWeight: 100 } : {},
  )}>
    {label}
  </Avatar>
)
