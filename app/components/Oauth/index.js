import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export const parseCredentials = hash => {
  return hash.split(/#|&/).reduce((memo, chunk) => {
    if ( !chunk.length ) return memo

    const [ key, value ] = chunk.split('=')
    return Object.assign(memo, {[key]: value})
  }, {})
}

//ry  CCP's SSO should redirect straight to a Cognito endpoint
//... which will redirect to here with a unique CognitoId
//... hence, forget about CCP's access token and use CognitoId's instead
export const Oauth = ({location}) => {
  const creds = parseCredentials(location.hash)
  console.log(creds)
  return <div> loading your inventory... </div>
}

export default connect()(withRouter(Oauth))
