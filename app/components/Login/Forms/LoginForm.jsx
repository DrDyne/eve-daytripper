import React from 'react'
import {
  Card,
  CardContent,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from 'material-ui'
import style from './style.css'

export const LoginForm = props => {
  const { rememberMe } = props
  const { onChange, toggleRememberMe, login, signup } = props
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
  </List></CardContent></Card>)
}
