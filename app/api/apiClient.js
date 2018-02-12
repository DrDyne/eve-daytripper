export class ApiClient {
  baseUrl
  token = null

  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  credentials = token => token ? this.token = token : this.token

  url = path => this.baseUrl + path

  apiGetJson = path => {
    const url = this.url(path)
    const headers = { Authorization: this.token, 'Content-Type': 'application/json' }

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
    const headers = { Authorization: this.token, 'Content-Type': 'application/json' }

    return fetch(url, {headers, body: JSON.stringify(json), method: 'post'})
    .then(res => res.json())
  }

  getFleet = () => this.apiGetJson('/fleet')
  postFleet = json => this.apiPostJson(json, `/fleet`)

  getInventory = charId => this.apiGetJson(`/${charId}/inventory`)
  postInventory = (json, charId) => this.apiPostJson(json, `/${charId}/inventory`)

  getGps = charId => this.apiGetJson(`/${charId}/gps`)
  postGps = (json, charId) => this.apiPostJson(json, `/${charId}/gps`)
}

export default ApiClient
