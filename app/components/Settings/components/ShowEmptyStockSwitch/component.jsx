import React from 'react'
import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'

export const ShowEmptyStockSwitch = ({toggleShowEmptyStock, checked}) => {

  return (<div>
    <FormControlLabel
      control={<Switch
        checked={checked}
        onChange={toggleShowEmptyStock}
      />}
      label="Show empty stock"
    />
  </div>)
}
