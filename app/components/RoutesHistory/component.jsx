import React from 'react'
import {
  Avatar,
  Button,
  IconButton,
  Typography
} from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import RouteMenu from './RouteMenu'
import FavoriteHistoryListItems from './Favorites'
import WormholeHistoryListItems from './Jspace'
import RoutesHistoryListItems from './Kspace'

export const RoutesHistory = props => {
  return (<div style={{
    width: '100%',
  }}>
  {/*}
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
  */}
    <ListSubheader style={{
      background: 'white'
    }}>
      J-space
    </ListSubheader>
    <WormholeHistoryListItems {...props} />

    <ListSubheader style={{
      background: 'white'
    }}>
      K-space
    </ListSubheader>
    <RoutesHistoryListItems {...props} />

    <ListSubheader style={{
      background: 'white'
    }}>
      Favorites
    </ListSubheader>
    <FavoriteHistoryListItems {...props} />
  </div>)
}
