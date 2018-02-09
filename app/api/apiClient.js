export class ApiClient {
  baseUrl
  token = null

  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  credentials = token => token ? this.token = token : this.token

  url = (path, charId) => ( this.baseUrl + path
    + ( !!charId ? `?charId=${ charId }` : '' )
  )

  apiGetJson = (path, charId) => {
    const url = this.url(path, charId)
    const headers = { Authorization: this.token }

    return fetch(url, {headers})
    .catch(err => {
      console.warn('oops', err)
      throw err
    })
    .then(res => res.json())
    .then(body => JSON.parse(body))
  }

  apiPostJson = (json, path, charId) => {
    const url = this.url(path, charId)
    const headers = { Authorization: this.token }
    const body = JSON.stringify(json)

    return fetch(url, {headers, body, method: 'post'})
    .then(res => res.json())
    .then(body => JSON.parse(body))
  }

  getFleet = () => this.apiGetJson('/fleet')
  getGps = charId => this.apiGetJson('/gps', charId)
  getInventory = charId => this.apiGetJson('/inventory', charId)

  postFleet = (json) => this.apiPostJson(json, '/fleet')
  postGps = (json, charId) => this.apiPostJson(json, '/gps', charId)
  postInventory = (json, charId) => this.apiPostJson(json, '/inventory', charId)
}

export default ApiClient
