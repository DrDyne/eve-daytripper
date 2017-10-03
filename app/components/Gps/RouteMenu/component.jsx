import React from 'react'
import {
  Menu,
  IconButton,
} from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'

export class RouteMenu extends React.Component {
  state = {
    anchor: null,
    show: false,
  }

  openMenu = event => this.setState({
    anchor: event.currentTarget,
    show: true
  })

  closeMenu = () => this.setState({
    anchor: event.currentTarget,
    show: false
  })

  render () {
    const { route, layout, gps } = this.props

    const isFavoriteRoute = gps.favorites.find(fav => fav.id === route.destination.id)
    if ( isFavoriteRoute ) return <div>
      <RouteMenuButton openMenu={this.openMenu} />
      <FavoriteRouteMenu {...this.props} anchor={this.state.anchor} show={this.state.show} onRequestClose={this.closeMenu} />
    </div>

    return <div>
      regular route menu
    </div>
  }
}

const RouteMenuButton = ({openMenu}) => {
  return <IconButton
    style={{display: 'flex'}}
    onClick={openMenu}
  >
    <MoreVert />
  </IconButton>
}

import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import MoveToInbox from 'material-ui-icons/MoveToInbox';
import Drafts from 'material-ui-icons/Drafts';
import Send from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';

export class FavoriteRouteMenu extends React.Component {
  state = {
    confirmDelete: false,
  }

  toggleConfirm = action => () => {
    const key = `confirm${action}`
    this.setState({ [key]: !this.state[key] })
  }

  closeConfirm = action => () => {
    const key = `confirm${action}`
    this.setState({ [key]: !this.state[key] })
  }

  render () {
    const { route } = this.props
    const { deleteFavorite } = this.props
    const { anchor, show, onRequestClose } = this.props

    return (
      <Menu anchorEl={anchor} open={show} onRequestClose={onRequestClose}>
        <List subheader={<ListSubheader>Nested List Items</ListSubheader>}>
          <ListItem button>
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Drafts />
            </ListItemIcon>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button onClick={this.toggleConfirm('Delete')}>
            <ListItemIcon>
              <MoveToInbox />
            </ListItemIcon>
            <ListItemText inset primary="delete from favorites" />
            {this.state.confirmDelete ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.confirmDelete} transitionDuration="auto" unmountOnExit>
            <ListItem
              button
              onClick={this.closeConfirm('Delete')}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Cancel" />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                this.closeConfirm('Delete')
                deleteFavorite(route.origin)
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Confirm" />
            </ListItem>
          </Collapse>
        </List>
      </Menu>
    );

    return <Menu>
      origin
        set favorite
      destination
        delete from favorite
          cancel
          confirm
    </Menu>
  }
}
