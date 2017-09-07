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
import {
  FillGauge
} from '../FillGauge'

export const StockList = ({layout, items, stock, showMenu}) => {
  const getInventoryQty = name => {
    const item = items.find(i => i.name === name)
    return !item ? 0 : item.qty
  }

  return (<div> stock list, {stock.length} items
    <List>
      {stock.map(item => (<div key={item.name}>
        <ListItem button onClick={showMenu(item)}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={item.name}
            secondary={`${getInventoryQty(item.name)} / ${item.qty}`}
            />

          <ListItemSecondaryAction>
            <IconButton aria-label="remove from stock">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>
        <FillGauge qty={getInventoryQty(item.name)} target={item.qty} />
      </div>))}
    </List>
  </div>)
}
