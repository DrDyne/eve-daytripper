import React from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem, ListItemText } from 'material-ui/List'
import GroupAddIcon from 'material-ui-icons/GroupAdd'
import { Route } from 'react-router-dom'

export const AddMemberButton = props => {
  const { color } = props

  return (
    <Route render={({history}) => (
      <ListItem button dense style={{paddingLeft: 32}} onClick={() => {
        history.push('/home/fleet-add')
      }}>
        <Avatar style={{backgroundColor: color}}>
          <GroupAddIcon />
        </Avatar>
        {/* // re-enable when app handles multiple fleet members
          <ListItemText primary="Add member" />
        */}
        <ListItemText primary="Switch character" />
      </ListItem>
  )} /> )
}
