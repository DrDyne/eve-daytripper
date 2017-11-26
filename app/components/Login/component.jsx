import React from 'react'
import style from './style.css'
import { Route } from 'react-router-dom'
import {
  LoginForm,
  SignupForm,
} from './Forms'
import Grid from 'material-ui/Grid'
import List, { ListItem } from 'material-ui/List'

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
    showForm: 'signup',
    confirmPassword: '',
    email: '',

    $focused: 'login',
    errorPasswordsDontMatch: false,
    errorPasswordTooWeak: false,
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

  resetValidation = () => {
    this.setState({
      errorPasswordsDontMatch: false,
      errorPasswordTooWeak: false,
    })
  }

  focus = form => () => this.setState({ $focused: form })

  render () {
    const { username, password } = this.state

    return (<div className={style.root}>

      <LoginBranding />

      <Grid container spacing={24} style={{
        width: 600,
        margin: '0 auto',
      }}>
        <Grid item
          onMouseEnter={this.focus('login')}
          style={{
            flexGrow: 'signup' === this.state.$focused ? 0 : 1,
            transition: '0.2s ease-in'
          }}
        >
          <Route render={({history}) => (
            <LoginForm
              onChange={this.onChange}
              {...this.props}
              login={() => {
                const { username, password } = this.state
                if ( !username ) return this.setState({ errorMissingUsername: true })
                if ( !password ) return this.setState({ errorMissingPassword: true })

                this.props.login(username, password)
                .then(() => history.push('/home'))
                .catch(console.warn)
              }}
            />
          )} />
        </Grid>

        <Grid item
          onMouseEnter={this.focus('signup')}
          style={{
            flexGrow: 'login' === this.state.$focused ? 0 : 1,
            transition: '0.2s ease-in'
          }}
        >
          <Route render={({history}) => (
            <SignupForm
              onChange={this.onChange}
              {...this.props}
              showErrorPasswordsDontMatch={this.state.errorPasswordsDontMatch}
              showErrorPasswordTooWeak={this.state.showErrorPasswordTooWeak}
              signup={() => {
                const { username, password, confirmPassword, email } = this.state
                if ( password !== confirmPassword ) return this.setState({ errorPasswordsDontMatch: true })
                if ( !this.passwordStrongEnough(password) ) return this.setState({ errorPasswordTooWeak: true })
                if ( username.length < 4 ) return
                if ( !email ) return

                this.resetValidation()
                this.props.signup(username, password, email)
              }}
            />
          )} />
        </Grid>
      </Grid>

      <footer>
        This application has been created under the EVE Developer License Agreement.
      </footer>
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
