import React from 'react'
import {
  AppBar as MuiAppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from 'material-ui'
import {
  Menu as MenuIcon
} from 'material-ui-icons'
import style from './style.css'

export const AppBar = ({toggleSettingsMenu, char}) => {
  return (<div className={style.root}>
    <MuiAppBar position="fixed">
      <Toolbar disableGutters>
        <IconButton
          className="menu-burger"
          color="contrast"
          aria-label="menu-burger"
          onClick={toggleSettingsMenu}>
          <MenuIcon />
        </IconButton>
        <Avatar
          alt={char.name}
          src={char.portrait}
          className={style.avatar} />

        <Typography type="title" className={style.flex}>
          {char.name}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  </div>)
}
