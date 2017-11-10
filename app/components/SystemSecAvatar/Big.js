import React from 'react'
import { Avatar } from 'material-ui'
import { colors, secToHex } from './utils'

export const SystemSecAvatarBig = ({system}) => {
  return <Avatar style={{
    backgroundColor: secToHex(system.sec),
  }} />
}
