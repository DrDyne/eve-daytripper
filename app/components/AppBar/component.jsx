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
import PasteRecipient from '../PasteRecipient'
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

        <div className={style.flexGrow} />

        <Typography type="title" className={style.flex} align="right" style={{marginRight: 14}}>
          {char.name}
        </Typography>

        <Avatar
          alt={char.name}
          src={char.portrait}
          className={style.avatar}
          />

      </Toolbar>

      <PasteRecipient />
      
    </MuiAppBar>
  </div>)
}
