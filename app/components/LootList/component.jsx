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
import { M3 } from '../M3'
import { GameItemAvatar } from '../GameItemAvatar'
import style from './style.scss'

export const LootList = ({layout, inventory, history}) => {
  const total = {
    isk: inventory.total.isk,
    m3: inventory.total.m3,
    prev: history.lastInventory.total
  }

  return (<div style={style.root}> loot list, {inventory.items.length} items
    <List>
      {inventory.items.map((item, index) => (<ListItem key={`${item.name}-${index}`} button>
        <ListItemAvatar>
          <Avatar>
            <GameItemAvatar id={item.id} />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={item.name}
          secondary={item.qty}
          />
        <ListItemText
          secondary={<ISK value={item.isk}/>}
          />
      </ListItem>))}

      <ListItem>
        <div>
            total: <ISK value={total.isk} style={{display: 'inline'}} />
        </div>
        <div>
            total: <M3 value={total.m3} style={{display: 'inline'}} />
        </div>
        
        {total.prev.isk && (
          <Typography type="caption" className="delta-isk">
            { (total.isk-total.prev.isk > 0) ? '+' : '-' }
            <ISK value={ total.isk - total.prev.isk } />
          </Typography>)
        }
        {total.prev.m3 && (
          <Typography type="caption" className="delta-m3">
            { (total.m3-total.prev.m3 > 0) ? '+' : '-' }
            <M3 value={total.m3-total.prev.m3} />
          </Typography>)
        }
      </ListItem>
    </List>
  </div>)
}
