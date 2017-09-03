import React from 'react'
import {
  AppBar as MuiAppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from 'material-ui'
import {
  Menu as MenuIcon
} from 'material-ui-icons'
import style from './style.scss'

export const AppBar = ({toggleSettingsMenu}) => {
  return (<div className="root">
    <MuiAppBar position="static">
      <Toolbar disableGutters>
        <IconButton
          className="menu-burger"
          color="contrast"
          aria-label="menu-burger"
          onClick={toggleSettingsMenu}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  </div>)
}
