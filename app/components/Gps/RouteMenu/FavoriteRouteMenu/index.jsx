import React from 'react'
import ListSubheader from 'material-ui/List/ListSubheader';
import Menu from 'material-ui/Menu'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import StarBorder from 'material-ui-icons/StarBorder';

export class FavoriteRouteMenu extends React.Component {
  state = {
    confirmDeleteDestinationFromFavorites: false,
  }

  toggleConfirm = action => () => {
    const key = `confirm${action}`
    this.setState({ [key]: !this.state[key] })
  }

  resetConfirmations = () => {
    this.setState({
      confirmDeleteDestinationFromFavorites: false,
    })
  }

  render () {
    const { route } = this.props
    const { addFavorite, deleteFavorite } = this.props
    const { anchor, show, onRequestClose } = this.props

    return <Menu anchorEl={anchor} open={show} onRequestClose={() => {
      this.resetConfirmations()
      onRequestClose()
    }}>
      <ListSubheader>{route.origin.name}</ListSubheader>

      <ListItem button selected onClick={() => {
        addFavorite(route.origin)
        this.resetConfirmations()
        onRequestClose()
      }}>
        <ListItemIcon>
          <StarBorder  style={{fill: '#F50057'}} />
        </ListItemIcon>
        <ListItemText inset primary="set favorite" />
      </ListItem>

      <ListSubheader>{route.destination.name}</ListSubheader>

      <ListItem button onClick={this.toggleConfirm('DeleteDestinationFromFavorites')}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText inset primary="delete favorite" />
      </ListItem>

      <Collapse
        in={this.state.confirmDeleteDestinationFromFavorites}
        transitionDuration="auto"
        unmountOnExit
      >
        <ListItem button dense style={{textAlign: 'right'}}
          onClick={() => {
            deleteFavorite(route.destination)
            this.resetConfirmations()
            onRequestClose()
          }}
        >
          <ListItemText inset primary="Confirm" />
        </ListItem>
      </Collapse>
    </Menu>
  }
}
