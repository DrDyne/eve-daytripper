import React from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from 'material-ui'
import style from './style.css'


export const SignupForm = props => {
  const { onChange, signup } = props

  return (<Card><CardContent><List
    className={style.signupForm}
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

    <ListItem>
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        onChange={onChange}
        fullWidth
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Email"
        helperText="Only used to reset your password"
        name="email"
        onChange={onChange}
        fullWidth
      />
    </ListItem>

    <ListItem button onClick={signup}>
      Sign up
    </ListItem>
  </List></CardContent></Card>)
}
