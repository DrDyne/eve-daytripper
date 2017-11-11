import React from 'react'
import style from './style.css'
import { Grid } from 'material-ui'
import {
  Route
} from 'react-router-dom'
import config from './config'
import {
  LoginForm,
  SignupForm,
} from './Forms'

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
    showForm: 'signup',
    confirmPassword: '',
    email: '',
  }

  validCredentials = () => {
    return (this.username.length > 3) && (this.password.length > 8)
  }

  passwordStrongEnough = password => {
    if ( password.length < 8 ) return
    return true
  }

  onChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render () {
    const { username, password, rememberMe } = this.state

    return (<Grid container className={style.root}>
      <Route render={({history}) => ( <SignupForm
        onChange={this.onChange}
        {...this.props}
        signup={() => {
          const { username, password, confirmPassword, email } = this.state
          if ( password !== confirmPassword ) return
          if ( !this.passwordStrongEnough(password) ) return
          if ( username.length < 4 ) return
          if ( !email ) return

          this.props.signup(username, password, email)
        }} />
      )} />

      <Route render={({history}) => ( <LoginForm
        onChange={this.onChange}
        {...this.props}
        login={() => {
          const { username, password } = this.state
          this.props.login(username, password)
          .then(() => history.push('/home'))
        }} />
      )} />
    </Grid>)
  }
}
