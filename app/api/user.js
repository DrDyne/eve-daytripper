import AWS from 'aws-sdk'
import { aws } from './config.js'
import ApiClient from './apiClient'
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

const BASE_URL = 'https://fpfnkzp3zd.execute-api.us-east-1.amazonaws.com/dev'
const apiClient = new ApiClient(BASE_URL)
const userPool = new CognitoUserPool({
  UserPoolId : aws.userPoolId,
  ClientId : aws.appClientId,
})

const getSession = cognitoUser => {
  if ( !cognitoUser ) return

  cognitoUser.getSession((err, session) => {
    if ( err ) {
      return console.log('could not find session, please log in again')
    }
    //console.log('got session', session)
    const token = session.getIdToken().getJwtToken()
    apiClient.credentials(token)
  })
}

getSession(userPool.getCurrentUser())

export const ccpIdentify = token => {
  const options = {
    headers: { 'x-ccp-authorization': `Bearer ${token}`, },
    mode: 'cors',
  }
  //console.log('headers:', options)

  // aws/auth is a reverse http proxy to ccp's login server.
  // header x-ccp-authorization is mapped to Authorization on aws->ccp side
  return fetch(aws.api.url + '/auth', options)
  .then(res => {
    console.log(res)
    if ( !res.ok ) throw res
    return res.json()
  })
  .then(json => {
    if ( json.error ) throw json
    return json // json contains character info
  })
}

export const signup = (method, username, password, optional) => {
  const email = new CognitoUserAttribute({
    Name: 'email',
    Value: optional.email
  })

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, [email], null, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err)
      }

      const cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      return resolve(result.user)
    })
  })
}

export const logout = () => {
  const cognitoUser = userPool.getCurrentUser()
  return Promise.resolve(cognitoUser && cognitoUser.signOut())
}

export const login = (method, username, password) => {
  const creds = new AuthenticationDetails({ Username: username, Password: password })
  const cognitoUser = new CognitoUser({ Username: username, Pool: userPool })

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(creds, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err),
    })
  })
  .catch(err => {
    console.error('failed to log in', err)
    throw err
  })
  .then(result => result.getIdToken().getJwtToken())
  .then(token => {

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: aws.identityPoolId,
      Logins: {
        [`cognito-idp.${aws.region}.amazonaws.com/${aws.userPoolId}`]: token
      }
    })

    apiClient.credentials(token)
    return token
  })
}

export const resetPassword = email => { }

export const loadProfile = () => (
  apiClient.getFleet()
  .then(fleet => {
    console.log(fleet)
    const { id } = fleet.members.find(m => m.id === fleet.commander) // it's not what you think.
    return Promise.all([
      fleet,
      apiClient.getInventory(id),
      apiClient.getGps(id),
    ])
  })
  .then(([Fleet, Inventory, {routes, favorites, avoidance, origins}]) => {
    return {
      Fleet,
      Inventory,
      Routes: routes,
      Favorites: favorites,
      Avoidance: avoidance,
      Origins: origins,
    }
  })
)

export const saveProfile = ({fleet, inventory, routes, favorites, avoidance, origins}) => {
  const charId = fleet.commander
  console.log(fleet, inventory, routes, favorites, avoidance, origins)
  return Promise.all([
    apiClient.postFleet(fleet),
    apiClient.postInventory(inventory, charId),
    apiClient.postGps({routes, favorites, avoidance, origins}),
  ])
}

export default {
  ccpIdentify,
  signup,
  login,
  logout,
  resetPassword,
  loadProfile,
  saveProfile,
}
