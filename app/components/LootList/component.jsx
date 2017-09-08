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
  Typography,
} from 'material-ui'
import {
  Folder as FolderIcon,
  Delete as DeleteIcon
} from 'material-ui-icons'
import { ISK } from '../ISK'
import style from './style.scss'

export const LootList = ({layout, inventory, history}) => {
  const total = {
    isk: inventory.total.isk,
    volume: inventory.total.volume,
    prev: history.lastInventory.total
  }

  return (<div style={style.root}> loot list, {inventory.items.length} items
    <List>
      {inventory.items.map((item, index) => (<ListItem key={`${item.name}-${index}`} button>
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
          <Button disabled> <ISK value={item.price} /> </Button>
        </ListItemSecondaryAction>
      </ListItem>))}

      <ListItem>
        <ListItemText primary={<ISK value={total.isk} />} />
        <Typography type="caption" className={`delta delta-${total.isk-total.prev.isk}`}>
          { (total.isk-total.prev.isk > 0) ? '+' : '-' }
          <ISK value={ total.isk - total.prev.isk } />
        </Typography>
        <ListItemText primary={total.volume + ' m3'} />
      </ListItem>
    </List>
  </div>)
}
