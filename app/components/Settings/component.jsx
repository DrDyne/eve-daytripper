import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  Typography,
} from 'material-ui'

export const Settings = ({open, toggle}) => (<div>
  <Drawer anchor="left" open={open} onRequestClose={toggle}>
    <div style={{width: 250}}>
      settings drawer
    </div>
  </Drawer>
</div>)
