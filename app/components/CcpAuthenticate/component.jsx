import React from 'react'
import { Route } from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
import EveLoginButton from './EveLoginButton'
import Button from 'material-ui/Button'
import ButtonBase from 'material-ui/ButtonBase'
import config from './config'
import bgMain from 'Images/bg_main.jpg'
import style from './style.css'

export const CcpAuthenticate = props => {
  return (
    <Route render={({history}) => (
      <div className={style.container}>
        <div style={{flexGrow: 1}} />

        <div style={{marginBottom: 6}}>
          <div className={style.buttonContainer}>
            <ButtonBase
              focusRipple
            >
              <a href={config.oauthUrl}>
              <div
                className={style.buttonBackground}
              />
              </a>
            </ButtonBase>
          </div>
        </div>

        <div>
          <Button
              color="contrast"
              style={{width: 270}}
              onClick={() => history.push('/home')}
            >
              cancel
            </Button>
        </div>

        <div style={{flexGrow: 1}} />
      </div>
    ) } />
  )

  return (
    <Route render={({history}) => (
      <List>
        <ListItem button>
          <EveLoginButton />
        </ListItem>

        <ListItem button onClick={() => history.push('/home')}>
          cancel
        </ListItem>
      </List>
    ) } />
  )
}
