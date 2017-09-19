import React from 'react'
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
} from 'material-ui'
import Collapse from 'material-ui/transitions/Collapse'
import { FillGauge } from '../FillGauge'
import { GameItemAvatar } from '../GameItemAvatar'
import { ISK } from '../ISK'
import SetStockDialog from '../SetStockDialog'

export class StockList extends React.Component {
  state = {
    menuAnchor: null,
    menuItemKey: null,
    showStockDialog: false,
    selectedItems: [] // possibly, selecting multiple items before opening the menu will enable actions on them all
  }

  toggleMenu = name => event => {
    const itemKey = ( name === this.state.menuItemKey ) ? null : name
    this.setState({
      menuItemKey: itemKey,
      menuAnchor: event.currentTarget
    })
  }

  hideMenu = event => {
    this.setState({
      menuItemKey: null,
      menuAnchor: null
    })
  }

  hideDialogs = () => {
    this.setState({
      showStockDialog: false,
    })
  }

  setStock = item => event => {
    this.setState({
      selectedItems: [item],
      showStockDialog: true
    })
  }

  render () {
    const {layout, inventory} = this.props
    const getInventoryQty = name => {
      const item = inventory.items.find(i => i.name === name)
      return !item ? 0 : item.qty
    }

    const getInventoryPrice = name => {
      const item = inventory.items.find(i => i.name === name)
      return !item ? 0 : item.isk
    }

    return (<div> stock list, {inventory.stock.length} items
      <List>
        <AddStockListItem />
        { inventory.stock.filter(i => i.qty > (layout.showEmptyStock ? -1 : 0)).map(item => (<div key={item.name}>

          {/*<ListItem button onClick={this.toggleMenu(item.name)}>*/}
          <ListItem button onClick={this.setStock(item)}>
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

          <Collapse
            in={this.state.menuItemKey === item.name}
            transitionDuration="auto"
            unmountOnExit
            >
            <Button onClick={this.setStock(item)} raised> Set quantity </Button>
          </Collapse>
        </div>))}
      </List>

      <SetStockDialog
        items={this.state.selectedItems}
        open={this.state.showStockDialog}
        onRequestClose={() => {
          this.hideMenu()
          this.hideDialogs()
        }} />
    </div>)
  }
}

export class AddStockListItem extends React.Component {
  state = {
    itemSelected: null
  }

  render () {
    const { onSave } = this.props

    return <ListItem>
      <TextField
        label="Edit stock..."
        placeholder="Core Scanner Probe"
        style={{width: '80%'}}
        />

      <TextField
        label="Quantity"
        placeholder="8"
        disabled={this.state.itemSelected}
        />

      <Button onClick={onSave}>
        Save
      </Button>
    </ListItem>
  }
}
