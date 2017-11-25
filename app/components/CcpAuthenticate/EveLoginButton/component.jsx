import React from 'react'
import Button from 'material-ui/Button'
import 'Images/EVE_SSO_Login_Buttons_Large_Black.png'
import style from './style.css'
import config from '../config'

export const EveLoginButton = props => {
  return (
    <Button
      component={'a'}
      href={config.oauthUrl}
      className={style.eveLoginButton}
    >
      <div />
    </Button>
  )
}
