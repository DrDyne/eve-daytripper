import React from 'react'
import {
  Button,
  Typography
} from 'material-ui'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'

export const RoutesHistory = props => {
  const { origins, routes } = props

  return (<div style={{height: 900}}>
    <List>
      { origins.map(origin => (
        <div key={origin.id}>
          <Link to={`/home/route/${origin.name}`}>
            <Typography type="body2">
              {origin.name} ({origin.sec})
            </Typography>
          </Link>
        </div>
      ))}
    </List>
    routes history ({routes.length})
    <Link to="/home/route">
      <Button> Route </Button>
    </Link>
  </div>)
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
}
