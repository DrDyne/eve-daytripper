import AWS from 'aws-sdk'
import { aws } from './config'

AWS.config.region = aws.region

export const save = state => {
  // saves in "edt-inventories" for now
  const { inventory, char, gps, layout } = state
  const { origins, routes } = state.history
  const json = {
    inventory,
    char,
    gps,
    layout,
    origins,
    routes
  }

  const url = aws.api.url + '/inventory'
  return fetch(url, {
    method: 'post',
    body: json
  })
}

export const load = () => {
  const url = aws.api.url + '/inventory'

  return fetch(url)
  .then(res => res.json())
  .then(json => {
    console.log('received app state from aws')
    console.log(json)
  })
}
