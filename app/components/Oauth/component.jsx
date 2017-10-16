import React from 'react'

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
export class Oauth extends React.Component {
  componentWillMount () {
    const { id, authenticate } = this.props
    if ( !id ) {
      const creds = parseCredentials(location.hash)
      authenticate(creds)
    }
  }

  render () {
    const { name, portrait } = this.props
    return (<div>
      <p>
        Welcome {name}, loading your inventory...
      </p>
      <div>
        <img src={portrait} />
      </div>
      <div>
        <a href="/login"> login </a>
        <a href="/home"> home </a>
      </div>
    </div>)
  }
}
