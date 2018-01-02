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
import { CircularProgress } from 'material-ui/Progress';
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
          <ListItemText secondary={'so much isk'} />
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
        <div style={{position: 'relative'}}>
          <ListItemAvatar>
            <Avatar>
              <GameItemAvatar id={item.id} />
            </Avatar>
          </ListItemAvatar>
          <CircularProgress size={50} mode="determinate" value={100*(inventoryQty/item.qty)} style={{
            color: '#E65100',

            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -24,
            marginLeft: -24,
          }} />
        </div>
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
        secondary={`${inventoryQty} / ${item.qty}`}
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
