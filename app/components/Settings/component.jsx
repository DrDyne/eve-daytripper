import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  TextField,
  Typography,
} from 'material-ui'

export class Settings extends React.Component {
  state = {
    cargoCapacity: null
  }

  componentWillMount () {
    const { cargoCapacity } = this.props
    this.setState({cargoCapacity})
  }

  render () {
    const { open, toggle } = this.props

    return (<div>
      <Drawer anchor="left" open={open} onRequestClose={toggle}>
          <div style={{width: 250}}>
            <TextField
              id="cargoCapacity"
              type="text"
              label="Cargo Capacity"
              placeholder="400m3"
              helperText="0 is unlimited"
              value={this.state.cargoCapacity}
              onFocus={event => event.target.select()}
              onChange={event => {
                this.setState({cargoCapacity: event.target.value})
              }}
              fullWidth />
          </div>
        </Drawer>
      </div>)
  }
}
