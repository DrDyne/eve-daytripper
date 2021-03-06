import {
  GPS_FAVORITE,
  GPS_FAVORITE_REMOVE,
  GPS_AVOID,
  GPS_AVOID_REMOVE,
  GPS_RESET,
  GPS_INIT,
  CREATE_ROUTE,
  DELETE_ROUTE,
  DELETE_SYSTEM,
} from '../actions/gps'

import {
  CLEAR_ROUTE_HISTORY,
} from '../actions'

export const initialState = {
  favorites: [{
    id: 30000142,
    name: 'Jita',
    sec: 0.945913117
  //}, {
  //  id: 30002053,
  //  name: "Hek",
  //  sec: 0.549668267
  //}, {
  //  id: 30002659,
  //  name: "Dodixie",
  //  sec: 0.868406702
  //}, {
  //  id: 30002187,
  //  name: "Amarr",
  //  sec: 1
  }],
  avoidance: [],
  routes: [],
}

export const createRoute = (state, action) => {
  const { systems } = action
  const [origin, destination] = [
    systems.shortest[0],
    systems.shortest.slice().pop()
  ]

  const safest = {
    jumps: systems.safest.length,
    systems: systems.safest,
    bestSec: systems.safest.reduce((memo, {sec}) => Math.max(sec, memo), -1),
    worstSec: systems.safest.reduce((memo, {sec}) => Math.min(sec, memo), 1),
  }

  const shortest = {
    jumps: systems.shortest.length,
    systems: systems.shortest,
    bestSec: systems.shortest.reduce((memo, {sec}) => Math.max(sec, memo), -1),
    worstSec: systems.shortest.reduce((memo, {sec}) => Math.min(sec, memo), 1),
  }

  const routes = [{
    origin,
    destination,
    safest,
    shortest,
  }, ...state.routes]
  return Object.assign({}, state, { routes })
}

export const addFavorite = (state, {system}) => {
  const favorites = state.favorites.find(fav => fav.id === system.id)
  ? state.favorites
  : [...state.favorites, system]
  return Object.assign({}, state, { favorites })
}

export const removeFavorite = (state, {system}) => {
  const favorites = state.favorites.filter(fav => fav.id !== system.id)
  return Object.assign({}, state, { favorites })
}

export const deleteRouteByOrigin = (state, {origin}) => {
  const route = state.routes.filter(r => route.origin.id !== origin.id)
  return Object.assign({}, state, { routes })
}

export const deleteRoute = (state, {origin, destination}) => {
  const routes = state.routes.filter(route => {
    return !((origin.id === route.origin.id) && (destination.id === route.destination.id))
  })
  return Object.assign({}, state, { routes })
}

export const deleteSystem = (state, {system}) => {
  const routes = state.routes
  .filter(({origin}) => system.id !== origin.id)
  .filter(({destination}) => system.id !== destination.id)

  return Object.assign({}, state, { routes })
}

export const init = (state, {routes, favorites, avoidance}) => {
  return Object.assign({}, state, { routes, favorites, avoidance })
}

export const gps = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_ROUTE:
      return createRoute(state, action)
    case DELETE_ROUTE:
      return deleteRoute(state, action)
    case DELETE_SYSTEM:
      return deleteSystem(state, action)
    case CLEAR_ROUTE_HISTORY:
      return Object.assign(state, {routes: []})
    case GPS_FAVORITE:
      return addFavorite(state, action)
    case GPS_FAVORITE_REMOVE:
      return removeFavorite(state, action)
    case GPS_RESET:
      return initialState
    case GPS_INIT:
      return init(state, action)
  }

  return state
}
