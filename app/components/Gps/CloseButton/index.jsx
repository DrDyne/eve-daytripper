import React from 'react'
import { withRouter } from 'react-router-dom'
import { IconButton } from 'material-ui'
import Close from 'material-ui-icons/Close'

export const CloseButton = withRouter(({history}) => (
<IconButton onClick={() => history.push('/home')}>
  <Close />
</IconButton>))
