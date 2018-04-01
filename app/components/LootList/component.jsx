import React from 'react'
import Avatar from 'mui/Avatar'
import Typography from 'mui/Typography'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from 'mui/List'
import Collapse from 'mui/transitions/Collapse';

import {
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon
} from 'muii'

import { ISK } from '../ISK'
import { M3 } from '../M3'
import GameItemAvatar from '../GameItemAvatar'
import SetStockDialog from '../SetStockDialog'
import InfoButton from '../InfoButton'

import style from './style.scss'

export const LootListItem = ({index, item, onClick}) => (
  <div>
    <ListItem button dense onClick={onClick} >
      <ListItemIcon>
        <GameItemAvatar id={item.id} />
      </ListItemIcon>

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
    showEmptyInventoryConfirmation: false,
  }

  showInfo = item => {
    this.setState({
      showStockDialog: true,
      selectedItems: [item]
    })
  }

  hideInfo = () => {
    this.setState({
      showStockDialog: false,
      selectedItems: [],
    })
  }

  toggleEmptyInventoryConfirmation = () => {
    const showEmptyInventoryConfirmation = !this.state.showEmptyInventoryConfirmation
    this.setState({ showEmptyInventoryConfirmation })
  }

  confirmEmptyInventory = () => {
    const { emptyInventory } = this.props
    emptyInventory()
    this.setState({ showEmptyInventoryConfirmation: false })
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

        <ListItem button onClick={this.toggleEmptyInventoryConfirmation} disabled={!inventory.items.length}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText secondary="Empty Inventory" />
        </ListItem>

        <Collapse in={this.state.showEmptyInventoryConfirmation}>
          <ListItem button onClick={this.confirmEmptyInventory}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText primary="Your inventory will be empty, confirm?" />
          </ListItem>
        </Collapse>
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
                this.showInfo(item)
              }}
            />
          ))
        }
      </List>

      <SetStockDialog
        items={this.state.selectedItems}
        open={this.state.showStockDialog}
        onClose={() => {
          this.hideInfo()
        }} />
    </div>)
  }
}
