import React from 'react'
import {
  Button,
  ButtonBase,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  TextField,
  Typography,
} from 'material-ui'
import style from './style.css'
import {
  Link
} from 'react-router-dom'
import config from './config'

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

    return (<div className={style.root}>
      <List>
        <ListItem button onClick={() => this.setState({showForm: 'login'})}>
          Login
        </ListItem>

        <ListItem button onClick={() => this.setState({showForm: 'signup'})}>
          Signup
        </ListItem>
      </List>

      <SignupForm
        onChange={this.onChange}
        {...this.props}
        signup={() => {
          const { username, password, confirmPassword, email } = this.state
          if ( password !== confirmPassword ) return
          if ( !this.passwordStrongEnough(password) ) return
          if ( username.length < 4 ) return
          if ( !email ) return

          this.props.signup(username, password, email)
        }}
      />

      <LoginForm
        onChange={this.onChange}
        {...this.props}
        login={() => {
          const { username, password } = this.state
          this.props.login(username, password)
        }}
      />
    </div>)
  }
}

export const LoginForm = props => {
  const { rememberMe } = props
  const { onChange, toggleRememberMe, login, signup } = props
  return (<List
    subheader={<ListSubheader>Login</ListSubheader>}
    className={style.loginForm}
  >
    <ListItem>
      <TextField
        label="Username"
        name="username"
        onChange={onChange}
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
      />
    </ListItem>

    <ListItem dense button onClick={toggleRememberMe}>
      <Checkbox
        checked={rememberMe}
      />

      <ListItemText primary="Remember Me" />
    </ListItem>

    <ListItem button onClick={login}>
      Login
    </ListItem>

    <ListItem button onClick={() => console.log('reset password')}>
      Reset password
    </ListItem>
  </List>)
}

export const SignupForm = props => {
  const { onChange, signup } = props

  return (<List
    subheader={<ListSubheader>Signup</ListSubheader>}
    className={style.signupForm}
  >
    <ListItem>
      <TextField
        label="Username"
        name="username"
        onChange={onChange}
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        onChange={onChange}
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Email"
        helperText="Only used to reset your password"
        name="email"
        onChange={onChange}
      />
    </ListItem>

    <ListItem button onClick={signup}>
      Sign up
    </ListItem>
  </List>)
}
