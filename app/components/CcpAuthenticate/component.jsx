import React from 'react'
import { Route } from 'react-router-dom'
import List, { ListItem, ListItemText } from 'mui/List'
import Button from 'material-ui/Button'
import ButtonBase from 'material-ui/ButtonBase'
import config from './config'
import bgMain from 'Images/bg_main.jpg'
import style from './style.css'

const LoginWithEveOnlineButton = () => (
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
)

const CancelButton = ({onClick}) => (
  <Button
    style={{width: 270, color: '#f8f8f8'}}
    onClick={onClick}
  >
    CANCEL
  </Button>
)

const FlexPadding = () => <div style={{flexGrow: 1}} />

export const CcpAuthenticate = props => {
  return (
    <Route render={({history}) => (
      <div className={style.container}>
        <FlexPadding />

        <div style={{marginBottom: 6}}>
          <LoginWithEveOnlineButton />
        </div>

        <div>
          <CancelButton onClick={() => history.push('/home') } />
        </div>

        <FlexPadding />
      </div>
    ) } />
  )
}
