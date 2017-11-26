import React from 'react'
import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormLabel,
  TextField,
  Typography,
} from 'material-ui'
import
  List, {
  ListItem,
  ListItemText,
} from 'material-ui/List'
import style from './style.css'

export const LoginForm = props => {
  const {
    rememberMe,
    onChange,
    toggleRememberMe,
    login,
    loginError,
    signup
  } = props

  console.log(loginError)
  return (<Card><CardContent><List
    className={style.loginForm}
  >
    <ListItem>
      <TextField
        label="Username"
        name="username"
        onChange={onChange}
        fullWidth
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
        fullWidth
      />
    </ListItem>

    <ListItem dense button onClick={toggleRememberMe}>
      <ListItemText primary="Remember Me" />
      <Checkbox checked={rememberMe} />
    </ListItem>

    <ListItem button onClick={login}>
      Login
    </ListItem>

    <ListItem style={{
      display: loginError ? 'inherit' : 'none'
    }}>
      <FormLabel error>
        Invalid credentials
      </FormLabel>
    </ListItem>

    <Divider />

    <ListItem button onClick={() => console.log('reset password')}>
      Reset password
    </ListItem>
  </List></CardContent></Card>)
}
