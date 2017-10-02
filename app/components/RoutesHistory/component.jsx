import React from 'react'
import {
  Button,
  Typography
} from 'material-ui'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { NavLink } from 'react-router-dom'

export const RoutesHistory = props => {
  const { origins, routes } = props

  return (<div style={{height: 900}}>
    <List>
      { origins.map(origin => {
        const shortSec = origin.sec.toFixed(2)
        return (<ListItem key={origin.id}>
            <NavLink to={`/home/route/${origin.name}`}>
              <Typography type="body2">
                {origin.name} ({shortSec})
              </Typography>
            </NavLink>
        </ListItem>)
      })}
    </List>
    routes history ({routes.length})
    <NavLink to="/home/route">
      <Button> Route </Button>
    </NavLink>
  </div>)
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
}
