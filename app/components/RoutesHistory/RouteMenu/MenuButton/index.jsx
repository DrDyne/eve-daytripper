import React from 'react'
import { IconButton } from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'

export const MenuButton = ({openMenu}) => {
  return <IconButton
    style={{display: 'flex'}}
    onClick={openMenu}
  >
    <MoreVert />
  </IconButton>
}
