import React from 'react'
import {
  Menu,
  IconButton,
} from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'
import { FavoriteRouteMenu } from './FavoriteRouteMenu'

const RouteMenuButton = ({openMenu}) => {
  return <IconButton
    style={{display: 'flex'}}
    onClick={openMenu}
  >
    <MoreVert />
  </IconButton>
}

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

    const isFavoriteRoute = gps.favorites.some(fav => fav.id === route.destination.id)
    if ( isFavoriteRoute ) return <div>
      <RouteMenuButton openMenu={this.openMenu} />
      <FavoriteRouteMenu
        anchor={this.state.anchor}
        show={this.state.show}
        onRequestClose={this.closeMenu}
        {...this.props}
      />
    </div>

    return <div>
      regular route menu
    </div>
  }
}
