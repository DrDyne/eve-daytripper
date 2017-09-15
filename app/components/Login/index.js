import React from 'react'
import {
  Button,
  ButtonBase,
  Grid,
} from 'material-ui'
import style from './style.css'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import config from './config'
import EveLoginButtonImage from '../../../images/EVE_SSO_Login_Buttons_Large_Black.png'

export const EveLoginButton = () => (<Button
  component={'a'}
  href={config.oauth}
  className={style.eveLoginButton}
/>)

export const Login = () => {
  return (<div className={style.root}>
    <Grid container align="center" justify="center">
      <Grid item sm={12} className={style.top}/>
      <Grid item sm={4} className={style.left}/>
      <Grid item sm={4} className={style.center}>
        <EveLoginButton />
      </Grid>
      <Grid item sm={4} className={style.right}/>
      <Grid item sm={12} className={style.bottom}/>
    </Grid>
  </div>)
}

export default connect()(Login)
