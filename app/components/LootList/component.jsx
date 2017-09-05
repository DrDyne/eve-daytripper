import React from 'react'
import {
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui'
import {
  Folder as FolderIcon,
  Delete as DeleteIcon
} from 'material-ui-icons'

export const LootList = ({layout, items}) => {
  return (<div> loot list, {items.length} items
    <List>
      {items.map((item, index) => (<ListItem key={`${item.name}-${index}`} button>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={item.name}
          secondary={item.qty}
          />

        <ListItemSecondaryAction>
          <IconButton aria-label="remove from stock">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>))}
    </List>
  </div>)
}
