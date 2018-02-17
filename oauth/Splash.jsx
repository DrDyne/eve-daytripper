import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import api from 'App/api'
import ProfileLoadingSplashScreen from 'App/components/ProfileLoadingSplashScreen/component.jsx'

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

  oauthCallback = ({access_token}, delay=6000) => {
    console.log('authenticating')

    return api.user.ccpIdentify(access_token)
    .then(({CharacterID, CharacterName}) => {
      console.log('auth success', CharacterID, CharacterName)
      localStorage.setItem('charId', CharacterID)
      return { id: CharacterID, name: CharacterName }
    })
    .then(({id, name}) => {
      const fleet = {
        commander: id,
        members: [{ id, name }]
      }
      this.setState({ id, name })
      return api.user.saveProfile(id, { fleet })
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
      <a href="/home">Click here to access your profile</a>
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
