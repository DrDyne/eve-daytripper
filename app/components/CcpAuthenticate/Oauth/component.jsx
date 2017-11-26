import React from 'react'
import { Redirect } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import style from './style.css'

export const parseCredentials = hash => {
  return hash.split(/\/|#|&/).reduce((memo, chunk) => {
    if ( !chunk.length ) return memo

    const [ key, value ] = chunk.split('=')
    return Object.assign(memo, {[key]: value})
  }, {})
}

export const portrait256 = portrait64 => portrait64.replace(/64.jpg$/, '256.jpg')

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

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <div style={{ flexGrow: 1 }} />
        <div style={{
          flexGrow: 1,
          alignSelf: 'center',
        }}>
          <Typography type="body1">
            Welcome {name}, loading your inventory, adding you to the fleet...
          </Typography>
        </div>

        <div
          className={style.avatarContainer}
          style={{
            flexGrow: 1,
            alignSelf: 'center',
          }}
        >
          <div className={[style.avatarCover, isAuthenticated ? style.avatarCoverHidden : null].join(' ')} />
          <Avatar
            alt={name}
            src={portrait256(portrait)}
            className={style.avatar256}
            style={{
              width: 256,
              height: 256,
              marginRight: 5,
            }}
          />
          <CircularProgress size={256} style={{color: primaryColor}} className={style.avatarLoader} />
        </div>

        <div style={{flexGrow: 1}}>
          <a href="/login"> login </a>
          <a href="/home"> home </a>
        </div>
        { isAuthenticated && <Redirect to="/home" /> }
      </div>
    )
  }
}
