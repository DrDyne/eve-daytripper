import React from 'react'
import {
  Avatar,
  Button,
  Checkbox,
  Input,
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
import InfoButton from '../InfoButton'

export class StockList extends React.Component {
  state = {
    menuAnchor: null,
    menuItemKey: null,
    showStockDialog: false,
    selectedItems: [], // possibly, selecting multiple items before opening the menu will enable actions on them all
    showControls: null,
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

    return (<div style={{flex: '1 1 auto'}}>
      <List>
        {/*TODO
          <AddStockListItem />
        */}
        { inventory.stock.filter(i => i.qty > (layout.showEmptyStock ? -1 : 0)).map(item => (<div key={item.name}>

          {/*<ListItem button onClick={this.toggleMenu(item.name)}>*/}
          <ListItem
            onMouseEnter={() => {
              this.setState({showControls: item.id})
            }}
            onMouseLeave={() => {
              this.setState({showControls: null})
            }}
          >
              <Checkbox
                checked={item.checked}
                tabIndex={'-1'}
                onChange={() => item.checked = !item.checked}
                style={{
                  display: item.checked
                  ? 'inherit'
                  : this.state.showControls === item.id
                  ? 'inherit'
                  : 'none'
                }}
              />
            <div
              onClick={this.setStock(item)}
              style={{
                display: 'flex',
                flex: '1 1 auto',
                ':hover': { cursor: 'pointer' }
            }}>
              <ListItemAvatar>
                <Avatar>
                  <GameItemAvatar id={item.id} />
                </Avatar>
              </ListItemAvatar>


              <ListItemText
                primary={item.name}
                secondary={`${getInventoryQty(item.name)} / ${item.qty}`}
                />

              { layout.showStockPrice && (<Button disabled>
                <ISK value={getInventoryPrice(item.name)} />
              </Button> )}
            </div>

            <ListItemSecondaryAction>
              <InfoButton id={item.id}/>
            </ListItemSecondaryAction>

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
