import React from 'react'
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from 'material-ui'
import style from './style.css'

const ERROR__USER_ALREADY_EXISTS = "UsernameExistsException"

const validate = props => {
  const {
    signupError = {},
    showErrorPasswordTooWeak,
    showErrorPasswordsDontMatch
  } = props

  return {
    username: ERROR__USER_ALREADY_EXISTS === signupError.code
    && {
      helperText: 'Username already taken.',
      helperTextClassName: style.errorUsernameAlreadyTaken
    },
    passwordsDontMatch: showErrorPasswordsDontMatch
    && {
      helperText: "Passwords don't match.",
      helperTextClassName: style.errorPasswordsDontMatch
    },
    passwordTooWeak: showErrorPasswordTooWeak
    && {
      helperText: "Password too weak.",
      helperTextClassName: style.errorPasswordTooWeak
    },
  }
}

export const SignupForm = props => {
  const validation = validate(props)
  const {
    onChange,
    signup,
  } = props

  return (<Card><CardContent><List
    className={style.signupForm}
  >
    <ListItem>
      <TextField
        label="Username"
        name="username"
        onChange={onChange}
        fullWidth
        error={ !!validation.username }
        { ...validation.username }
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
        fullWidth
        error={ !!validation.passwordTooWeak }
        { ...validation.passwordTooWeak }
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        onChange={onChange}
        fullWidth
        error={ !!validation.passwordsDontMatch }
        { ...validation.passwordsDontMatch }
      />
    </ListItem>

    <ListItem>
      <TextField
        label="Email"
        helperText="Only used to reset your password"
        name="email"
        onChange={onChange}
        fullWidth
        error={ !!validation.invalidEmail }
        { ...validation.invalidEmail }
      />
    </ListItem>

    <ListItem>
      <Button onClick={signup} variant="raised" color="primary" style={{width: '100%'}}>
        Sign up
      </Button>
    </ListItem>
  </List></CardContent></Card>)
}

export default SignupForm
