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
  Menu,
  MenuItem,
  TextField,
  Typography
} from 'material-ui'
import {
  Folder as FolderIcon,
  MoreVert as MoreVertIcon
} from 'material-ui-icons'
import { FillGauge } from '../FillGauge'
import { GameItemAvatar } from '../GameItemAvatar'
import { ISK } from '../ISK'

export class StockList extends React.Component {
  state = {
    menuAnchor: null,
    menuItemKey: null,
    selectedItems: [] // possibly, selecting multiple items before opening the menu will enable actions on them all
  }

  showMenu = name => event => {
    this.setState({
      menuItemKey: name,
      menuAnchor: event.currentTarget
    })
  }

  hideMenu = name => event => {
    this.setState({
      menuItemKey: null,
      menuAnchor: null
    })
  }

  setStock = event => {
    const { selectedItems } = this.state
    // show "set stock" dialog
  }

  render () {
    const {layout, inventory} = this.props
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

          <ListItem button onClick={this.showMenu(item.name)}>
            <ListItemAvatar>
              <Avatar>
                <GameItemAvatar id={item.id} />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={item.name}
              secondary={`${getInventoryQty(item.name)} / ${item.qty}`}
              />

            <Button disabled>
              <ISK value={getInventoryPrice(item.name)} />
            </Button>

          </ListItem>
          <FillGauge qty={getInventoryQty(item.name)} target={item.qty} />
          <Menu
            open={!!this.state.menuItemKey}
            onRequestClose={this.hideMenu(item.name)} >
            <MenuItem onClick={this.setStock}> Set stock </MenuItem>
          </Menu>
        </div>))}
      </List>
    </div>)
  }
}
