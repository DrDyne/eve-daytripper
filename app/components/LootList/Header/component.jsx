import React from 'react'
import {
  Button,
  Toolbar,
  TextField,
  Typography
} from 'material-ui'
import Slide from 'material-ui/transitions/Slide'
import { LinearProgress } from 'material-ui/Progress'
import { M3 } from '../../M3'

export class Header extends React.Component {
  state = {
    shrinkLabel: false,
    clean: true,
    showPostPasteActions: false,
  }

  render () {
    const { inventory, history, setCapacity } = this.props
    const { clearMissing, sellMissing } = this.props
    const totalItems = inventory.items.filter(i => i.qty).length
    const inventoryCapacity = inventory.total.m3 / inventory.capacity * 100

    const capacityShort = 1000 > inventory.capacity
    ? inventory.capacity
    : 1000000 > inventory.capacity
    ? parseInt(inventory.capacity / 1000) + 'k'
    : parseInt(inventory.capacity / 1000 / 1000) + 'm'

    return (<div>
      <Toolbar style={{
          paddingRight: 1,
          minHeight: 40,
        }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }} >
        <TextField
          label={ `${Math.round(inventory.total.m3)} / ${capacityShort}m3` }
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
            width: '100%'
          }}
        />

        <LinearProgress
          mode="determinate"
          value={inventoryCapacity}
          style={{
            width: '100%',
            height: 4,
        }} />
      </div>

      <Slide in={history.inventory.length > 0} direction="left">
        <Button
          disabled={ history.inventory.length < 1 }
          onClick={clearMissing}
        >
          Clear missing
        </Button>
      </Slide>
      </Toolbar>
    </div>)
  }
}
