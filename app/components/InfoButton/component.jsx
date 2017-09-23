import React from 'react'
import {
  IconButton
} from 'material-ui'
import InfoIcon from 'material-ui-icons/Info'

export const InfoButton = (props) => {
  const { id, fetchInfo } = props
  return (<IconButton>
    <InfoIcon color="default" onClick={fetchInfo(id)} />
  </IconButton>)
}
