export const clientId = '4e133e6029104dd9a39722b9be82bc2b'
export const redirectUri = 'http://localhost:8889/oauth'
export const oauthResponseType = 'token'
export default {
  clientId: clientId,
  oauth: 'https://login.eveonline.com/oauth/authorize/' //https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2F3rdpartysite.com%2Fcallback&client_id=3rdpartyClientId&scope=characterContactsRead%20characterContactsWrite&state=uniquestate123
    + `?response_type=${oauthResponseType}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}` //https%3A%2F%2F3rdpartysite.com%2Fcallback
    + `&client_id=${clientId}` //3rdpartyClientId
    //+ `&scope=characterContactsRead%20characterContactsWrite`
    //+ `&state=uniquestate123`
    ,
}
