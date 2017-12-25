import React from 'react'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'

export const KSpaceSubHeader = ({letter}) => {
  return (<ListSubheader
    style={{
      textAlign: 'right'
    }} >
    { letter }
  </ListSubheader>)
}
