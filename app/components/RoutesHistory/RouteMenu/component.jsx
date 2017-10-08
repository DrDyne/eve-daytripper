import React from 'react'
import { MenuButton } from './MenuButton'
import { Menu } from './Menu'

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
    return <div>
      <MenuButton openMenu={this.openMenu} />
      <Menu
        anchor={this.state.anchor}
        show={this.state.show}
        onRequestClose={this.closeMenu}
        {...this.props}
      />
    </div>
  }
}
