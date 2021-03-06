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
  Typography
} from 'material-ui'
import { LinearProgress } from 'mui/Progress'
import Collapse from 'material-ui/transitions/Collapse'
import GameItemAvatar from '../GameItemAvatar'
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
    const { layout, inventory, collapsed } = this.props
    const getInventoryQty = name => {
      const item = inventory.items.find(i => i.name === name)
      return !item ? 0 : item.qty
    }

    const getInventoryPrice = name => {
      const item = inventory.items.find(i => i.name === name)
      return !item ? 0 : item.isk
    }

    if ( collapsed ) return (
      <List>
        <ListItem>
          <ListItemText secondary={
            inventory.stock
            .filter(i => i.qty > 0)
            .map(i => {
              const { id, qty } = i
              const item = inventory.items.find(i => id === i.id)
              return item ? item.m3 : 0
            }).reduce((memo, i) => memo + i, 0) + ' m3'
          } />
        </ListItem>
      </List>
    )

    return (<div style={{flex: '1 1 auto'}}>
      <List>
        { inventory.stock
          .filter(i => i.qty > (layout.showEmptyStock ? -1 : 0))
          .map((item, index) => (
            <StockListItem
              key={`stock/${index}:${item.name}`}
              layout={layout}
              item={item}
              index={index}
              onClick={() => this.setStock(item)}
              onMouseEnter={() => this.setState({showControls: item.id}) }
              onMouseLeave={() => this.setState({showControls: null}) }
              inventoryQty={getInventoryQty(item.name)}
              inventoryPrice={getInventoryPrice(item.name)}
              controlsShowing={this.state.showControls === item.id}
              menuItemKey={this.state.menuItemKey}
            />
          ))
        }
      </List>

      <SetStockDialog
        items={this.state.selectedItems}
        open={this.state.showStockDialog}
        onClose={() => {
          this.hideMenu()
          this.hideDialogs()
        }} />
    </div>)
  }
}

const styles = {
  MuiLinearProgress: {
    root: {
      color: '#e65100'
    }
  }
}

export const StockListItem = ({
  layout,
  item,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
  inventoryQty,
  inventoryPrice,
  controlsShowing,
  menuItemKey
}) => (
  <div>
    <ListItem onClick={onClick}>
      <div>
        <ListItemAvatar>
          <GameItemAvatar id={item.id} />
        </ListItemAvatar>

        <LinearProgress
          variant="determinate"
          value={ Math.round(100*(inventoryQty/item.qty)) }
          style={{ height: 5, marginTop: -4 }}
        />

        <Typography type="caption" style={{
          textAlign: 'center',
          marginTop: 2,
          fontSize: 'x-small',
        }}>
          { `${Math.round(100*(inventoryQty/item.qty))}%` }
        </Typography>
      </div>


      <ListItemText
        primary={item.name}
        secondary={ `${inventoryQty} / ${item.qty}` }
      />

      <ListItemSecondaryAction>
        <InfoButton id={item.id}/>
      </ListItemSecondaryAction>
    </ListItem>

    { layout.showStockPrice && (<Button disabled>
      <ISK value={inventoryPrice} />
    </Button> )}

  </div>
)
