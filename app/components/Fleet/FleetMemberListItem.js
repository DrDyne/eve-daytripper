import React from 'react'
import {
  Avatar
} from 'material-ui'
import {
  ListItem,
  ListItemText,
} from 'material-ui/List'

export const FleetMemberListItem = props => {
  const { id, name, role } = props.data
  const src = `http://image.eveonline.com/Character/${id}_64.jpg`

  return (
    <ListItem dense {...props}>
      <Avatar
        alt={name}
        src={src}
        style={{
          width: 64,
          height: 64,
          marginRight: 5,
        }}
      />
      <ListItemText primary={name} secondary={role} />
    </ListItem>
  )
}
