import React from 'react'
import {
  Button,
  Toolbar,
  TextField,
  Typography
} from 'material-ui'
import Collapse from 'material-ui/transitions/Collapse'
import { LinearProgress } from 'material-ui/Progress'
import { M3 } from '../../M3'

export class Header extends React.Component {
  state = {
    shrinkLabel: false,
    showPostPasteActions: false,
  }

  componentWillReceiveProps (nextProps) {
    //TODO check layout.showPostPasteActions instead of delta total isk
    const nextTotal = nextProps.inventory.total
    console.log(nextTotal, this.props.inventory.total, nextTotal.isk !== this.props.inventory.total.isk)
    if ( nextTotal.isk !== this.props.inventory.total.isk )
      this.setState({ showPostPasteActions: true })
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

        <Collapse in={this.state.showPostPasteActions} direction="right">
          <Toolbar disableGutters>
            <Button
              disabled={ history.inventory.length < 1 }
              onClick={() => {
                clearMissing()
                this.setState({ showPostPasteActions: false })
              }}
            >
              Clear missing
            </Button>

            <div style={{
                flexGrow: 1
            }} />

            <ClosePasteActionsButton onClick={() => {
                this.setState({ showPostPasteActions: false })
            }} />
          </Toolbar>
        </Collapse>

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

      </Toolbar>
    </div>)
  }
}

import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
const ClosePasteActionsButton = ({onClick}) => {
  return <IconButton onClick={onClick} aria-label="Close">
    <CloseIcon />
  </IconButton>
}
