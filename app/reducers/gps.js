import {
  GPS_FAVORITE,
  GPS_FAVORITE_REMOVE,
  GPS_AVOID,
  GPS_AVOID_REMOVE,
  GPS_SEARCH,
  CREATE_ROUTE,
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
  search: {
    origin: '',
    destination: '',
  }
}

export const createRoute = (state, action) => {
  const { systems } = action
  const [origin, jumps, destination] = [
    systems[0],
    systems.length,
    systems.slice().pop()
  ]
  const avgSec = systems.reduce((m, s) => m + s.sec, 0) / jumps
  const safetyScore = avgSec //* systems.reduce((m, s) => m + (-1+s.sec), 0) // higher = more dangerous
  const bestSec = systems.reduce((memo, {sec}) => Math.max(sec, memo), -1)
  const worstSec = systems.reduce((memo, {sec}) => Math.min(sec, memo), 1)
  const routes = [{
    origin,
    jumps,
    destination,
    systems,
    safetyScore,
    bestSec,
    worstSec,
  }, ...state.routes]
  return Object.assign({}, state, { routes })
}

export const search = (state, action) => {
  const { origin, destination } = action
  const search = {
    origin: origin || state.origin,
    destination: destination || state.destination,
  }

  return Object.assign({}, state, { search })
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

export const gps = (state=initialState, action) => {
  switch(action.type) {

    case CREATE_ROUTE:
      return createRoute(state, action)
    case CLEAR_ROUTE_HISTORY:
      return Object.assign(state, {routes: []})
    case GPS_SEARCH:
      return search(state, action)
    case GPS_FAVORITE:
      return addFavorite(state, action)
    case GPS_FAVORITE_REMOVE:
      return removeFavorite(state, action)
  }

  return state
}
