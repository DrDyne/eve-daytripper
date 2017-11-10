import React from 'react'
import { Avatar } from 'material-ui'
import { SystemSecAvatarBig } from './Big'
import { colors, secToHex } from './utils'

export const SystemSecAvatar = ({system, size}) => {
  return <span style={{
    width: size || 10,
    height: size || 10,
    borderRadius: size || 10,
    backgroundColor: secToHex(system.sec),
    display: 'inline-block',
    marginRight: 5
  }} />
}

export {
  SystemSecAvatarBig
}
