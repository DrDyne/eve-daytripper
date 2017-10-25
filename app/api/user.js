import {
  env,
  aws,
  oauth
} from './config.js'

export const authenticate = token => {
  const headers = {
    'x-ccp-authorization': `Bearer ${token}`,
  }
  console.log('headers:', headers)

  // aws/auth is a reverse http proxy to ccp's login server.
  // header x-ccp-authorization is mapped to Authorization on aws->ccp side
  return fetch(aws.api.url + '/auth', { headers })
  .then(res => {
    console.log(res)
    if ( !res.ok ) throw res
    return res.json()
  })
}

export default {
  authenticate
}
