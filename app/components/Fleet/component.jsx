import React from 'react'
import { Button } from 'material-ui'
import { ListItem } from 'material-ui/List'
import { FleetMemberListItem } from './FleetMemberListItem'

export const Fleet = props => {
  const { testLoadCharacter } = props
  const { members } = props

  return (<div>
    <ListItem button onClick={testLoadCharacter}>
      Test load character
    </ListItem>

    { members.map(m => <FleetMemberListItem item={m} key={m.id}/>) }
  </div>)
}
