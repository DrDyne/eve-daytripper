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
import SetStockDialog from '../SetStockDialog'
import InfoButton from '../InfoButton'
import style from './style.scss'

export const filterEmptyQty = i => i.qty > 0

export class LootList extends React.Component {
  state = {
    selectedItems: [],
    showStockDialog: false,
  }

  render () {
    const { layout, inventory, history } = this.props
    const total = {
      isk: inventory.total.isk,
      m3: inventory.total.m3,
      prev: history.lastInventory.total
    }

    return (<div style={style.root}>
      <List>
        {inventory.items
          .filter(filterEmptyQty)
          .map((item, index) =>
        (<ListItem
          key={`${item.name}-${index}`}
          button
          onClick={() => {
            this.setState({
              showStockDialog: true,
              selectedItems: [item]
            })
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <GameItemAvatar id={item.id} />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={item.name}
            secondary={item.qty}
            />
          <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: 10,
          }}>
            <ListItemText
              secondary={<ISK value={item.isk}/>}
              />
          </div>

          <ListItemSecondaryAction>
            <InfoButton id={item.id} />
          </ListItemSecondaryAction>
        </ListItem>))}

      </List>

      <SetStockDialog
        items={this.state.selectedItems}
        open={this.state.showStockDialog}
        onRequestClose={() => {
          this.setState({
            showStockDialog: false,
            selectedItems: [],
          })
        }} />
    </div>)
  }
}
