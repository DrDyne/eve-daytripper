export const eveClientId = '4e133e6029104dd9a39722b9be82bc2b'
//export const redirectUri = 'http://localhost:8880/#/oauth' //dev
export const redirectUri = 'http://eve-daytripper.s3-website-us-east-1.amazonaws.com/latest/#/oauth' //prod
export const oauthResponseType = 'token'

export default {
  clientId: eveClientId,
  oauthUrl: 'https://login.eveonline.com/oauth/authorize/' //https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2F3rdpartysite.com%2Fcallback&client_id=3rdpartyClientId&scope=characterContactsRead%20characterContactsWrite&state=uniquestate123
    + `?response_type=${oauthResponseType}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}` //https%3A%2F%2F3rdpartysite.com%2Fcallback
    + `&client_id=${eveClientId}` //3rdpartyClientId
    //+ `&scope=characterContactsRead%20characterContactsWrite`
    //+ `&state=uniquestate123`
}
