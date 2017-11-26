import React from 'react'
import {
  Button,
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

  return (<Card><CardContent><List
    className={style.loginForm}
  >
    <ListItem>
      <TextField
        label="Username"
        name="username"
        onChange={onChange}
        fullWidth
        helperText={loginError && 'Invalid username'}
        error={!!loginError}
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
        fullWidth
        helperText={loginError && 'Invalid password'}
        error={!!loginError}
      />
    </ListItem>

    <ListItem dense>
      <ListItemText primary="Remember me" />
      <Checkbox onClick={toggleRememberMe} checked={rememberMe} />
    </ListItem>

    <ListItem onClick={login}>
      <Button raised color="primary" style={{width: '100%'}}>
        Login
      </Button>
    </ListItem>

    <Divider />

    <ListItem onClick={() => console.log('reset password')}>
      <Button style={{width: '100%'}}>
        Reset password
      </Button>
    </ListItem>

  </List></CardContent></Card>)
}
