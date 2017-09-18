import {
  env,
  awsApiUrl,
  oauthVerifyUrl
} from './config.js'

export const authenticate = token => {
  const headers = {
    Authorization: `Bearer ${token}`,
    //Accept: 'application/json',
    //Host: 'login.eveonline.com'
  }
  console.log('headers:', headers)
  //return fetch(oauthVerifyUrl, {
  return fetch(`/${env}/character`, {
    headers,
    method: 'GET',
    mode: 'no-cors',
  })
  .then(res => {
    console.log(res)
    if ( !res.ok ) throw res
    return res.json()
  })
}

export const signIn = charId => {
  fetch(awsApiUrl + '/character', {
    headers: {
      Authoriztion: `Bearer ${token}`
    }
  })
}

export default {
  authenticate
}
