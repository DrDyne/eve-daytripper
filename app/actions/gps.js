import {
  saveRoute,
  GPS_BUSY,
  GPS_BUSY_DONE,
  GPS_SEARCH,
  GPS_FAVORITE,
  GPS_FAVORITE_REMOVE,
} from './index.js'

export const isWormhole = name => /^J[0-9]{6}$/.test(name)

const byOriginId = id => route => route.origin.id === id

export const deleteFavorite = system => ({
  type: GPS_FAVORITE_REMOVE,
  system
})

export const addFavorite = system => (getState, dispatch, {api}) => {
  dispatch({ type: GPS_FAVORITE, system })

  console.log('add fav', system)
  const { origins } = getState().history
  // for each favorites , cr
}

const createRoute = (origin, destination) => (dispatch, getState, {api}) => {
  const alreadyExists = getState().gps.routes.find(r => {
    return r.origin.id === origin.id
    && r.destination.id === destination.id
  })

  if ( alreadyExists ) return Promise.resolve(alreadyExists)

  return api.gps.route(origin, destination)
}

const createFavoriteRoutes = origin => (dispatch, getState, {api}) => {
  const { favorites } = getState().gps
  return Promise.all(favorites.map(destination => {
    if ( origin.id === destination.id ) return
    return dispatch(createRoute(origin, destination))
  }))
}

export const createRouteFromPaste = () => (dispatch, getState, {api}) => {
  const { raw } = getState().history.lastPasted
  const { routes } = getState().gps

  if ( raw.length > 25 ) return

  return api.gps.identify(raw)
  .then(origin => {
    return routes.find(byOriginId(origin.id))
    ? Promise.reject('route already exists') // at least, its origin
    : origin
  })
  .then(origin => dispatch(createFavoriteRoutes(origin)))
  .then(routes => {
    return routes
    .filter(route => !!route)
    .map(route => dispatch(saveRoute(route)))
  })
  .catch(err => {
    if ( 'route already exists' !== err ) throw err
    console.warn(err)
    return Promise.resolve()
  })
}

export const searchOrigin = origin => ({ type: GPS_SEARCH, origin })
export const searchDestination = destination => ({ type: GPS_SEARCH, destination })
const gpsBusy = () => ({ type: GPS_BUSY })
const gpsBusyDone = () => ({ type: GPS_BUSY_DONE })

export const search = (origin, destination) => (dispatch, getState, {api}) => {
  if ( origin ) dispatch(searchOrigin(origin))
  if ( destination ) dispatch(searchDestination(destination))

  dispatch(gpsBusy())

  return Promise.all([
    api.gps.identify(origin),
    api.gps.identify(destination)
  ])
  .then(identified => {
    console.log('search successful, now create route', identified)
    return dispatch(createRoute(identified[0], identified[1])) // TODO create shortest, safest
  })
  .then(route => { // why do I receive the root state here ???
    console.log('created route:', route)

    return dispatch(createFavoriteRoutes(route[0]))
    .then(fav => [route, ...fav])
    .then(routes => {
      return routes.map(r => dispatch(saveRoute(r)))
    })
  })
  .catch(err => {
    console.warn(err)
    return Promise.resolve()
  })
  .then(() => dispatch(gpsBusyDone()))
}
