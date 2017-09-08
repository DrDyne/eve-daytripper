import React from 'react'
import {
  Avatar,
  Button,
  IconButton,
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

export const StockList = ({layout, inventory, showMenu}) => {
  const getInventoryQty = name => {
    const item = inventory.items.find(i => i.name === name)
    return !item ? 0 : item.qty
  }

  const getInventoryPrice = name => {
    const item = inventory.items.find(i => i.name === name)
    return !item ? 0 : item.price
  }

  return (<div> stock list, {inventory.stock.length} items
    <List>
      {inventory.stock.map(item => (<div key={item.name}>
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
            <Button disabled> {getInventoryPrice(item.name)} ISK </Button>
          </ListItemSecondaryAction>

        </ListItem>
        <FillGauge qty={getInventoryQty(item.name)} target={item.qty} />
      </div>))}
    </List>
  </div>)
}
