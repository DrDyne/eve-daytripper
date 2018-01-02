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
import { ISK } from '../ISK'
import { M3 } from '../M3'
import { GameItemAvatar } from '../GameItemAvatar'
import SetStockDialog from '../SetStockDialog'
import InfoButton from '../InfoButton'
import style from './style.scss'

export const LootListItem = ({index, item, onClick}) => (
  <div>
    <ListItem button dense onClick={onClick} >
      <ListItemAvatar>
        <Avatar>
          <GameItemAvatar id={item.id} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={item.name}
        secondary={item.qty}
        />

      <ListItemSecondaryAction>
        <InfoButton id={item.id} />
      </ListItemSecondaryAction>
    </ListItem>

    <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        textAlign: 'right',
        fontSize: 'x-small'
    }}>
      <Typography type="caption">
        <ISK value={item.isk}/>
      </Typography>
    </div>
  </div>
)

export class LootList extends React.Component {
  state = {
    selectedItems: [],
    showStockDialog: false,
  }

  render () {
    const { layout, inventory, history, collapsed } = this.props
    const total = {
      isk: inventory.total.isk,
      m3: inventory.total.m3,
      prev: history.lastInventory.total
    }

    if ( collapsed ) return (
      <List>
        <ListItem>
          <ListItemText secondary={`${inventory.items.length} items`} />
        </ListItem>
      </List>
    )

    return (<div style={style.root}>
      <List>
        { inventory.items
          .filter(i => i.qty > 0)
          .map((item, index) => (
            <LootListItem
              item={item}
              index={index}
              key={`loot/${index}:${item.name}`}
              onClick={() => {
                this.setState({
                  showStockDialog: true,
                  selectedItems: [item]
                })
              }}
            />
          ))
        }
      </List>

      <SetStockDialog
        items={this.state.selectedItems}
        open={this.state.showStockDialog}
        onClose={() => {
          this.setState({
            showStockDialog: false,
            selectedItems: [],
          })
        }} />
    </div>)
  }
}
