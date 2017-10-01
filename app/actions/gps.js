import {
  createRoute
} from './index.js'

export const isWormhole = name => /^J[0-9]{6}$/.test(name)

const byOriginId = id => route => route.origin.id === id

export const createRouteFromPaste = () => (dispatch, getState, {api}) => {
  const { raw } = getState().history.lastPasted
  const { favorites, routes } = getState().gps

  if ( raw.length > 25 ) return

  return api.gps.identify(raw)
  .then(origin => {
    if ( routes.find(byOriginId(origin.id)) ) return Promise.reject('route already exists')
    return origin
  })
  .then(origin => Promise.all(favorites.map(destination => {
    return api.gps.route(origin, destination)
    .then(route => (route[0].id === origin.id) ? route : route.reverse()) // sometimes ccp server reverses order /shrug
  })))
  .then(routes => {
    console.log('routes !', routes)
    routes.forEach(route => {
      dispatch(createRoute(route))
    })
  })
  .catch(err => {
    if ( 'route already exists' !== err ) throw err
    console.warn(err)
    return Promise.resolve()
  })
}
