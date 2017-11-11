import React from 'react'
import style from './style.css'
import {
  Route
} from 'react-router-dom'
import config from './config'
import {
  LoginForm,
  SignupForm,
} from './Forms'
import {
  Grid,
  List,
  ListItem,
} from 'material-ui'

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
    showForm: 'signup',
    confirmPassword: '',
    email: '',

    $focused: '',
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
    const { username, password } = this.state

    return (<div className={style.root}>

      <LoginBranding />

      <Grid container spacing={24} style={{
        width: 600,
        margin: '0 auto',
      }}>
        <Grid item style={{
          flexGrow: 'signup' === this.state.focused ? 0 : 1
        }}>
          <Route render={({history}) => ( <LoginForm
            onChange={this.onChange}
            {...this.props}
            login={() => {
              const { username, password } = this.state
              this.props.login(username, password)
              .then(() => history.push('/home'))
            }} />
          )} />
        </Grid>

        <Grid item style={{
          flexGrow: 'login' === this.state.focused ? 0 : 1,
        }}>
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
        </Grid>
      </Grid>

    </div>)
  }
}

import {
  Typography
} from 'material-ui'
const LoginBranding = props => {
  return (<Typography type="display4" style={{
    textAlign: 'center',
    marginBottom: '0.5em',
  }}>
    Eve-daytripper
  </Typography>)
}
