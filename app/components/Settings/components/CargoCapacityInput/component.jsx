import React from 'react'

export const CargoCapacityInput = ({value, onChange}) => {
  return (<TextField
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
  fullWidth />)
}
