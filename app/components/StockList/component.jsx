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

export const StockList = ({layout, items, stock}) => {
  const getQty = name => {
    const item = items.find(i => i.name === name)
    return !item ? 0 : item.qty
  }

  return (<div> stock list, {stock.length} items
    <List>
      {stock.map(item => (<ListItem key={item.name} button>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={item.name}
          secondary={`${getQty(item.name)} / ${item.qty}`}
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
