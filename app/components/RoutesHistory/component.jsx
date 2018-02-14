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

//TODO find dom node after search and scroll
//var elem = document.getElementById('yourId'); //chat container's ID where your messages stack up.
//elem.scrollTop = elem.scrollHeight;

const COLOR_JSPACE = 'rgba(240, 1, 0, 0.03)'
const COLOR_KSPACE = 'rgba(47, 241, 239, 0.03)'

export const RoutesHistory = props => {
  const styles = {
    list: {
      width: '100%',
      paddingLeft: 0
    }
  }

  return (<ul style={styles.list}>
  {/*
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
  */}
    <ul style={styles.list}>
      <ListSubheader>
        J-space
      </ListSubheader>
      <WormholeHistoryListItems {...props} />
    </ul>

    <ul style={styles.list}>
      <ListSubheader>
        K-space
      </ListSubheader>
      <RoutesHistoryListItems {...props} />
    </ul>

    <ul style={styles.list}>
      <ListSubheader style={{ background: 'white' }}>
        Favorites
      </ListSubheader>
      <FavoriteHistoryListItems {...props} />
    </ul>
  </ul>)
}
