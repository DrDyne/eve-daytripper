import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from 'material-ui'
import style from './style.css'


export const SignupForm = props => {
  const { onChange, signup } = props

  return (<List
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
