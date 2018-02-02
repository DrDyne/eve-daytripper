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
    const headers = { Authorization: this.token }

    return fetch(url, {headers})
    .then(res => res.json())
    .then(body => JSON.parse(body))
  }

  getFleet = () => this.apiGetJson('/fleet')
  getGps = () => this.apiGetJson('/gps')
  getInventory = () => this.apiGetJson('/inventory')
}

export default ApiClient
