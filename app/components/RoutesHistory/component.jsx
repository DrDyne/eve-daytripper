import React from 'react'
import {
  Button,
  Typography
} from 'material-ui'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'

export const RoutesHistory = props => {
  const { routes } = props
  const origins = routes.reduce((memo, [origin]) => {
    return memo.find(o => o.id === origin.id)
    ? memo
    : memo.concat(origin)
  }, [])

  return (<div style={{height: 900}}>
    <List>
      { origins.map(origin => (
        <div key={origin.id}>
          <Link to={`/route/${origin.name}`}>
            <Typography type="body2">
              {origin.name} ({origin.sec})
            </Typography>
          </Link>
        </div>
      ))}
    </List>
    routes history ({routes.length})
    <Button onClick={() => { console.log('redirect to route') }}>
      Route
    </Button>
  </div>)
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
}
