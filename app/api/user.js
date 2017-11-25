import AWS from 'aws-sdk'
import { aws } from './config.js'
import { load, save } from './db'
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

const BASE_URL = 'https://fpfnkzp3zd.execute-api.us-east-1.amazonaws.com/dev'

//WIP
//const WIP_TOKEN = "eyJraWQiOiJjckF5OXhVbFE4TElabDdVNkxcL3p3WVR2bTdJcnNLWGlKQm9iaWI5VkxxQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkM2Q2NzhhMC00NDhmLTQyMjctOGZkZi0wNWRlNjU2OGFhOWIiLCJhdWQiOiIxb2gwNDE1N281djJ1aTNkc3FiMW42NTMwbyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTEwMTg4NTgzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90U0RsVDVleGUiLCJjb2duaXRvOnVzZXJuYW1lIjoiYm9iYnkxIiwiZXhwIjoxNTEwMTkyMTgzLCJpYXQiOjE1MTAxODg1ODN9.Tna6ht4EJifOw2WOvpwp42BB-ZMfVDSChIFioFfdk8Z85BoPLbGJNvG9I_x9PIyTcd1PEx_USWs74tZmVKacyOhexg4ESGkXL-sYS3ipoY7aJBEOK2Lri9sbApFwKoBW1e31i1VSZI1QYDH3FJGWcUHkEbytTdkCsGVLV8gvEBjBMQ7cpsib42AmUm7w_G4NJSa5mqxfhmG_yHuOxb7JnP6LgtTFZ2OpWxk0FVaayjHUcR_nqOGYQe8nTgxbQGujVQndGAww_By934wC9s7cwZ-Umu1LO1YK46ZGgYEsIYbwu8YnyYUezQzvphIlj5scTWm0EIq99v0eZ8dxJM2xLg"

const WIP_TOKEN = "eyJraWQiOiJjckF5OXhVbFE4TElabDdVNkxcL3p3WVR2bTdJcnNLWGlKQm9iaWI5VkxxQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkM2Q2NzhhMC00NDhmLTQyMjctOGZkZi0wNWRlNjU2OGFhOWIiLCJhdWQiOiIxb2gwNDE1N281djJ1aTNkc3FiMW42NTMwbyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTEwMjQ5OTg1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV90U0RsVDVleGUiLCJjb2duaXRvOnVzZXJuYW1lIjoiYm9iYnkxIiwiZXhwIjoxNTEwMjUzNTg1LCJpYXQiOjE1MTAyNDk5ODV9.X7k8D-Qxr9gp4GYmImNduMTU5yX4HL1k2XY5A4a1I7ObULotxqN3s-lh8gOYq_aGKGVaIw5x5KWhfKPf-Mx31g3pgy1KWOezanCmJ5OsFn-vD60GOWjSTHl0de249TdnYWKw9j-aifbL-F88FBB5KRT1tPt64WYDCDjQRumllLPyRaSjv1fKcQJq0agxg6C0B0RDpylpMPYlBnn4klYPfY266TmQOyCYt_dxFKZInegRuhsi1O0sug3hfeBG51zel9wL5M2qBTH-Zfbpz89_oR7H52lWhRB40URp90tO7eQJEeAeK6UxaqFtWPC2Ef1vtsEWyg4ccmNwtEH3iL0EFg"


export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.token = WIP_TOKEN
  }

  credentials = ({token}) => {
    this.token = token
  }

  url = path => this.baseUrl + path

  apiGetJson = path => {
    const url = this.url(path)
    const headers = { Authorization: this.token }

    return fetch(url, {headers})
    .then(res => res.json())
    .then(body => JSON.parse(body))
  }

  getFleet = () => this.apiGetJson('/fleet')
  getGps = () => this.apiGetJson('/gps')
  getInventory = () => this.apiGetJson('/inventory')
}

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
    apiClient.credentials({token})
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
  })
  .then(result => {
    const token = result.getIdToken().getJwtToken()

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: aws.identityPoolId,
      Logins: {
        [`cognito-idp.${aws.region}.amazonaws.com/${aws.userPoolId}`]: token
      }
    })

    apiClient.credentials({token})
    //getSession(userPool.getCurrentUser())

    return token
    //const url = 'https://fpfnkzp3zd.execute-api.us-east-1.amazonaws.com/dev/character'
    //const options = {
    //  headers: {
    //    Authorization: result.getIdToken().getJwtToken()
    //  },
    //}
    //return fetch(url, options, res => {
    //  console.log(res)
    //})
    //.then(() => fetch('https://fpfnkzp3zd.execute-api.us-east-1.amazonaws.com/dev/inventory', options, res => {
    //  console.log(res)
    //}))
  })
}

export const resetPassword = email => { }

export const loadProfile = () => {
  return Promise.all([
    apiClient.getFleet(),
    apiClient.getInventory(),
    apiClient.getGps(),
  ])
  .then(([fleet, inventory, Gps]) => {
    return {
      gps: {
        routes: Gps.routes,
        favorites: Gps.favorites,
        avoidance: Gps.avoidance,
      },
      origins: Gps.origins,
      inventory,
      fleet,
    }
  })
}

export const saveProfile = state => {
  console.log('TODO')
}

export default {
  ccpIdentify,
  signup,
  login,
  resetPassword,
  loadProfile,
}
