import React from 'react'
import { IconButton } from 'material-ui'
import InfoIcon from 'material-ui-icons/Info'
//TODO add dialog !

export const InfoButton = (props) => {
  const { id, showInfoDialog, dialogContent } = props
  return (<IconButton>
    <InfoIcon onClick={showInfoDialog(id)} />
  </IconButton>)
}
