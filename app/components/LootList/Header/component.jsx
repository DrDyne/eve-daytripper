import React from 'react'
import {
  Toolbar,
  TextField,
  Typography
} from 'material-ui'
import {
  LinearProgress,
} from 'material-ui/Progress'
import { M3 } from '../../M3'

export class Header extends React.Component {
  state = {
    shrinkLabel: false,
  }

  render () {
    const { inventory, setCapacity } = this.props
    const totalItems = inventory.items.filter(i => i.qty).length
    const inventoryCapacity = inventory.total.m3 / inventory.capacity * 100

    const capacityShort = 1000 > inventory.capacity
    ? inventory.capacity
    : 1000000 > inventory.capacity
    ? parseInt(inventory.capacity / 1000) + 'k'
    : parseInt(inventory.capacity / 1000 / 1000) + 'm'

    return (<div>
      <Toolbar>
        <div style={{
            display: 'flex',
            flex: '1 1 auto',
          }}>
          <Typography type="body1">
            loot list, {totalItems} items
          </Typography>
        </div>
      </Toolbar>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        <TextField
          label={ `${inventory.total.m3} / ${capacityShort}m3` }
          placeholder={inventory.capacity.toString()}
          onChange={setCapacity}
          onFocus={() => this.setState({shrinkLabel: true}) }
          onBlur={event => {
            event.target.value = null
            this.setState({shrinkLabel: false})
          }}
          InputLabelProps={{
            shrink: this.state.shrinkLabel
          }}
          style={{
            maxWidth: 90
          }}
        />

        <LinearProgress
          mode="determinate"
          value={inventoryCapacity}
          style={{
            width: '100%',
            height: 2,
          }} />
      </div>
    </div>)
  }
}
