import React from 'react'
import {
  Button,
  Typography
} from 'material-ui'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { NavLink } from 'react-router-dom'
import { SystemSecAvatar } from '../SystemSecAvatar'

export const RoutesHistory = props => {
  const { origins, routes } = props

  return (<div style={{
    width: '100%',
  }}>
      { origins.map(origin => {
        const shortSec = origin.sec.toFixed(2)
        return (<NavLink
          to={`/home/route/${origin.name}`}
          key={origin.id}
          style={{
            textDecoration: 'none'
          }}>
          <ListItem button>
            <SystemSecAvatar system={origin}/>
            <ListItemText primary={<div>
              <Typography type="headline">
                {origin.name}
              </Typography>
              <Typography type="caption">
                {origin.sec.toFixed(2)}
              </Typography>
            </div>} />
          </ListItem>
        </NavLink>)
      })}
  </div>)
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
}
