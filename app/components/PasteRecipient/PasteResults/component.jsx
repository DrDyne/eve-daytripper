import React from 'react'
import { CardContent } from 'material-ui/Card'
import {
  Button,
  Typography
} from 'material-ui'

export const PasteResults = ({lastPasted, origins}) => {
  return null //wip
  
  if ( lastPasted.items.length ) return (
    <PastedItems items={lastPasted.items} />
  )

  const system = origins.find(({name}) => name.toUpperCase() === lastPasted.raw.toUpperCase())
  if ( system ) return (
    <PastedSystem system={system} />
  )

  return null
}

const PastedItems = ({items}) => (
  <CardContent style={{borderTop: '1px solid #eee'}}> {items.length} items </CardContent>
)

import { SystemSecAvatar } from '../../SystemSecAvatar'
const PastedSystem = ({system}) => (
  <CardContent style={{borderTop: '1px solid #eee'}}>
    <div style={{
      flexGrow: 1,
      textAlign: 'center',
    }}>
      <SystemSecAvatar system={system} /> {system.name}
    </div>
  </CardContent>
)
