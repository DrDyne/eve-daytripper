import {
  createRoute
} from './index.js'

export const isWormhole = name => /^J[0-9]{6}$/.test(name)

export const createRouteFromPaste = () => (dispatch, getState, {api}) => {
  const { raw } = getState().history.lastPasted
  const { favorites } = getState().gps

  if ( raw.length > 25 ) return

  return api.gps.identify(raw)
  .then(origin => Promise.all(favorites.map(destination => {
    return api.gps.route(origin, destination)
    .then(route => (route[0].id === origin.id) ? route : route.reverse())
  })))
  .then(routes => {
    console.log('routes !', routes)
    routes.forEach(route => {
      dispatch(createRoute(route))
    })
  })
}
