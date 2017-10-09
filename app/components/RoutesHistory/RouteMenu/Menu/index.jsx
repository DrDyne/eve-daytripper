import React from 'react'
import ListSubheader from 'material-ui/List/ListSubheader'
import MuiMenu from 'material-ui/Menu'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Delete from 'material-ui-icons/Delete'
import DeleteSweep from 'material-ui-icons/DeleteSweep'
import StarBorder from 'material-ui-icons/StarBorder'
import { SystemSecAvatar } from '../../../SystemSecAvatar'

export class Menu extends React.Component {
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
    const { route, gps, layout } = this.props
    const { addFavorite, deleteFavorite, deleteRoute } = this.props
    const { anchor, show, onRequestClose } = this.props

    const { origin, destination } = route
    const isFavorite = gps.favorites.find(fav => fav.id === destination.id)

    const AddFavoriteListItem = ({system}) => (
      <ListItem
        button
        disabled={gps.favorites.some(fav => fav.id === system.id)}
        onClick={() => {
        addFavorite(system)
        this.resetConfirmations()
        onRequestClose()
      }}>
        <ListItemIcon>
          <StarBorder  style={{fill: '#F50057'}} />
        </ListItemIcon>
        <ListItemText primary="set favorite" />
      </ListItem>
    )

    const DeleteFavoriteListItem = ({system}) => (<div>
      <ListItem
        button
        disabled={ !isFavorite || 'Jita' === system.name }
        onClick={this.toggleConfirm('DeleteDestinationFromFavorites')}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="delete favorite" />
      </ListItem>

      <Collapse
        in={this.state.confirmDeleteDestinationFromFavorites}
        transitionDuration="auto"
        unmountOnExit
      >
        <ListItem button dense style={{textAlign: 'right'}}
          onClick={() => {
            deleteFavorite(system)
            this.resetConfirmations()
            onRequestClose()
          }}
        >
          <ListItemText inset primary="Confirm" />
        </ListItem>
      </Collapse>
    </div>)

    const DeleteFromHistoryListItem = ({system}) => ( <ListItem button>
      <ListItemIcon>
        <DeleteSweep />
      </ListItemIcon>
      <ListItemText
        primary={<span><SystemSecAvatar system={origin} />{origin.name}</span>}
        secondary="from history"
      />
    </ListItem> )

    const DeleteRouteListItem = props => {
      const { route } = props
      const { jumps } = route[layout.showShortestRoutes ? 'shortest' : 'safest']

      return ( <ListItem
          button
          onClick={deleteRoute(origin, destination)}
          disabled={gps.favorites.some(fav => fav.id === destination.id)}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary={<span>
            {origin.name}/{jumps}/{destination.name}
          </span>} />
      </ListItem> )
    }

    return <MuiMenu
      anchorEl={anchor}
      open={show}
      onRequestClose={() => {
      this.resetConfirmations()
      onRequestClose()
    }}>

      <DeleteRouteListItem route={route}/>

      <ListSubheader>
        <SystemSecAvatar system={origin} />{origin.name}
      </ListSubheader>

      { gps.favorites.find(fav => fav.id === origin.id)
      ? <DeleteFavoriteListItem system={origin} />
      : <AddFavoriteListItem system={origin} />
      }

      { destination.name !== 'Jita' && <div>
        <DeleteFromHistoryListItem system={origin} />

        <ListSubheader>
          <SystemSecAvatar system={destination} />{destination.name}
        </ListSubheader>

        { gps.favorites.find(fav => fav.id === destination.id)
        ? <DeleteFavoriteListItem system={destination} />
        : <AddFavoriteListItem system={destination} />
        }
      </div> }
    </MuiMenu>
  }
}
