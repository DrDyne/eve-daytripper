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
    onChange,
    login,
    loginError,
    signup,
    busy,
  } = props

  return (
    <form onKeyDown={event => {
      if ( 'Enter' !== event.key ) return;
      event.preventDefault();
      login()
    }}>
      <Card>
        <CardContent>
          <List
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

            <ListItem onClick={login}>
              <Button variant="raised" color="primary" style={{width: '100%'}}>
                Login
              </Button>
            </ListItem>

            <Divider />

            <ListItem onClick={() => console.log('reset password')}>
              <Button style={{width: '100%'}}>
                Reset password
              </Button>
            </ListItem>

          </List>
        </CardContent>
      </Card>
    </form>
  )
}

export default LoginForm
