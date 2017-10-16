import React from 'react'
import Collapse from 'material-ui/transitions/Collapse'

import {
  Button
} from 'material-ui'

export const PasteActions = (props) => {
  const { show, clearMissing, sellMissing } = props
  return (<Collapse in={true} >
    <Button onClick={clearMissing}> Clear missing </Button>
    <Button onClick={sellMissing} disabled>  Sell missing </Button>
  </Collapse>)
}
