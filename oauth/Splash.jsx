import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Button from 'mui/Button'

import { ccpIdentify, saveProfile } from 'App/api/user'
import ProfileLoadingSplashScreen from 'App/components/ProfileLoadingSplashScreen/component'

const REDIRECT_URI = '/latest/#/home'

export class Splash extends React.Component {
  state = {
    id: null,
    name: null,
    done: false,
    profileSaved: false,
  }

  componentWillMount () {
    const creds = this.parseCredentials(location.hash)
    this.oauthCallback(creds)
  }

  oauthCallback = ({access_token}, delay=2000) => {
    console.log('authenticating')

    return ccpIdentify(access_token)
    .then(({CharacterID, CharacterName}) => {
      console.log('auth success', CharacterID, CharacterName)
      return { id: CharacterID, name: CharacterName }
    })
    .then(({id, name}) => {
      const fleet = {
        commander: id,
        members: [{ id, name }]
      }
      this.setState({ id, name })
      //localStorage.setItem('id', CharacterID)
      //localStorage.setItem('name', CharacterName)
      return saveProfile(id, { fleet })
    })
    .then(() => {
      console.log('saved')
      this.setState({profileSaved: true})
      setTimeout(() => this.setState({done: true}), delay)
    })
  }

  parseCredentials = hash => {
    return hash.split(/\/|#|&/).reduce((memo, chunk) => {
      if ( !chunk.length ) return memo

      const [ key, value ] = chunk.split('=')
      return Object.assign(memo, {[key]: value})
    }, {})
  }

  render () {
    const { profile } = this.props
    const { done, profileSaved, id, name } = this.state

    if ( done && profileSaved ) return (
      <ProfileLoadingSplashScreen
        show={ true }
        showProgress={ false }
        fullWidth={ true }
        profile={{ id, name }}
        message={
          <div style={{padding: 14}}>
            <Button
              href={REDIRECT_URI}
              fullWidth
              variant="raised"
              size="large"
              variant="raised"
              color="primary"
            >
              HOME
            </Button>
          </div>
        }
      />
    )

    return (
      <ProfileLoadingSplashScreen
        show={ true }
        fullWidth={ true }
        profile={{ id, name }}
      />
    )
  }
}

export default Splash
