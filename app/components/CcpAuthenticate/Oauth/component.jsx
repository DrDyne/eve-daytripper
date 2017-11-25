import React from 'react'
import { Redirect } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import { CircularProgress } from 'material-ui/Progress'
import style from './style.css'

export const parseCredentials = hash => {
  return hash.split(/\/|#|&/).reduce((memo, chunk) => {
    if ( !chunk.length ) return memo

    const [ key, value ] = chunk.split('=')
    return Object.assign(memo, {[key]: value})
  }, {})
}

//ry  CCP's SSO should redirect straight to a Cognito endpoint
  //... which will redirect to here with a unique CognitoId
  //... hence, forget about CCP's access token and use CognitoId's instead
  //... except for adding fleet members, genius.
export class Oauth extends React.Component {
  componentWillMount () {
    console.log('here')
    const { id, authenticate } = this.props
    if ( !id ) {
      const creds = parseCredentials(location.hash)
      authenticate(creds)
    }
  }

  render () {
    const {
      name,
      portrait,
      isAuthenticated,
      primaryColor
    } = this.props
    console.log(name, portrait, isAuthenticated)

    return (<div>
      <p>
        Welcome {name}, loading your inventory, adding you to the fleet...
      </p>
      <div
        className={style.avatarContainer}
        style={{
          backgroundColor: 'green'
        }}
      >
        <Avatar
          alt={name}
          src={portrait}
          style={{
            width: 64,
            height: 64,
            marginRight: 5,
          }}
        />
        <CircularProgress size={64} style={{color: primaryColor}} />
        wut ?
      </div>

      <div>
        <img src={portrait} />
      </div>
      <div>
        <a href="/login"> login </a>
        <a href="/home"> home </a>
      </div>
      { isAuthenticated && <Redirect to="/home" /> }
    </div>)
  }
}
