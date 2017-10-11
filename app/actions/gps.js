import {
  GPS_BUSY,
  GPS_BUSY_DONE,
  GPS_SEARCH,
  GPS_FAVORITE,
  GPS_FAVORITE_REMOVE,
  CREATE_ROUTE,
  DELETE_ROUTE,
} from './index.js'

export const isWormhole = name => /^J[0-9]{6}$/.test(name)
export const matchRoute = (origin, system) => route => ((route.origin.id === origin.id) && (route.destination.id === system.id))

const byOriginId = id => route => route.origin.id === id

export const deleteFavorite = system => ({
  type: GPS_FAVORITE_REMOVE,
  system
})

export const deleteRoute = (origin, destination) => ({
  type: DELETE_ROUTE,
  origin,
  destination
})

export const saveRoute = systems => ({
  type: CREATE_ROUTE,
  systems
})

export const addFavorite = system => (dispatch, getState, {api}) => {
  dispatch({ type: GPS_FAVORITE, system })

  const { gps, history } = getState()
  const favoriteRoutes = history.origins
  .filter(origin => origin.id !== system.id)
  .filter(origin => !gps.routes.some(matchRoute(origin, system)))
  .map(origin => {
    return dispatch(createRoute(origin, system))
    .then(route => dispatch(saveRoute(route)))
  })

  return Promise.all(favoriteRoutes)
}

const createRoute = (origin, destination) => (dispatch, getState, {api}) => {
  const alreadyExists = getState().gps.routes.find(r => {
    return r.origin.id === origin.id
    && r.destination.id === destination.id
  })

  if ( alreadyExists ) return Promise.resolve(alreadyExists)

  return Promise.all([
    api.gps.shortest(origin, destination),
    api.gps.safest(origin, destination)
  ])
  .then(([shortest, safest]) => ({shortest, safest}))
}

const createFavoriteRoutes = origin => (dispatch, getState, {api}) => {
  const { favorites, routes } = getState().gps
  const favoriteRoutes = favorites
  .filter(destination => origin.id !== destination.id )
  .filter(destination => !routes.some(matchRoute(origin, destination)))
  .map(destination => dispatch(createRoute(origin, destination)))

  return Promise.all(favoriteRoutes)
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
  const { layout } = getState

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

    return dispatch(createFavoriteRoutes(route.shortest[0]))
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
