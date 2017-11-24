export const GPS_FAVORITE_REMOVE = 'gps:favorites:delete'
export const GPS_FAVORITE = 'gps:favorites:add'
export const GPS_BUSY = 'gps:busy'
export const GPS_BUSY_DONE = 'gps:busy:done'
export const GPS_IDENTIFIED_SYSTEM = 'gps:identified:system'

export const CREATE_ROUTE = 'gps:route:create'
export const DELETE_ROUTE = 'gps:route:delete'
export const DELETE_SYSTEM = 'gps:system:delete'
export const GPS_INIT = 'gps:init'

const matchRoute = (origin, system) => route => ((route.origin.id === origin.id) && (route.destination.id === system.id))

const byOriginId = id => route => route.origin.id === id

export const init = ({routes, favorites, avoidance}) => ({
  type: GPS_INIT,
  routes,
  favorites,
  avoidance,
})
export const deleteFavorite = system => ({ type: GPS_FAVORITE_REMOVE, system })
export const deleteRoute = (origin, destination) => ({ type: DELETE_ROUTE, origin, destination })
export const deleteHistory = system => ({ type: DELETE_SYSTEM, system })
export const saveRoute = systems => ({ type: CREATE_ROUTE, systems })
const gpsBusy = () => ({ type: GPS_BUSY })
const gpsBusyDone = () => ({ type: GPS_BUSY_DONE })
export const addOriginToHistory = system => ({ type: GPS_IDENTIFIED_SYSTEM, system })

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
  .then(routes => routes.filter(route => !!route))
}

export const createRouteFromPaste = () => (dispatch, getState, {api}) => {
  const { raw } = getState().history.lastPasted
  const { routes } = getState().gps

  if ( raw.length > 25 ) return

  return api.gps.identify(raw.trim())
  .then(origin => {
    dispatch(addOriginToHistory(origin))
    return origin
  })
  .then(origin => {
    return routes.find(byOriginId(origin.id))
    ? Promise.reject('route already exists') // at least, its origin.
    : origin
  })
  .then(origin => dispatch(createFavoriteRoutes(origin)))
  .then(routes => {
    return routes.map(route => dispatch(saveRoute(route)))
  })
  .catch(err => {
    if ( 'route already exists' !== err ) throw err
    console.warn(err)
    return Promise.resolve()
  })
}

export const search = (origin, destination) => (dispatch, getState, {api}) => {
  const { layout } = getState

  dispatch(gpsBusy())

  return Promise.all([
    api.gps.identify(origin),
    api.gps.identify(destination)
  ])
  .then(([origin, destination]) => {
    console.log('search successful, now create route', [origin, destination])

    dispatch(addOriginToHistory(origin))
    return dispatch(createRoute(origin, destination))
  })
  .then(route => {
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
