import React from 'react'
import { Button } from 'material-ui'
import { ListItem } from 'material-ui/List'
import { FleetMemberListItem } from './FleetMemberListItem'

export class Fleet extends React.Component {

  render () {
    const { members } = this.props

    return (<div>
      { members.map(m => <FleetMemberListItem data={m} key={m.id}/>) }
    </div>)
  }
}
