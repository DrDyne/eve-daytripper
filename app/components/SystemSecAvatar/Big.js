import React from 'react'
import { Avatar } from 'material-ui'
import { colors, secToHex } from './utils'

export const SystemSecAvatarBig = ({system, label}) => (
  <Avatar style={{
    backgroundColor: secToHex(system.sec),
  }}>
    {label}
  </Avatar>
)
