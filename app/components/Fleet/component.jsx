import React from 'react'
import { Button } from 'material-ui'
import { FleetMemberListItem } from './FleetMemberListItem'
import AddMemberButton from './AddMemberButton'

export const Fleet = props => {
  const { members } = props

  return (<div>
    { members.map(m => <FleetMemberListItem data={m} key={m.id}/>) }
    { 0 === members.length && (
      <AddMemberButton />
    )}
  </div>)
}
