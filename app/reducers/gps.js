import {
  GPS_FAVORITE,
  GPS_FAVORITE_REMOVE,
  GPS_AVOID,
  GPS_AVOID_REMOVE,
  CREATE_ROUTE,
  CLEAR_ROUTE_HISTORY,
} from '../actions'

export const initialState = {
  favorites: [{
    id: 30000142,
    name: 'Jita',
    sec: 0.945913117
  }, {
    id: 30002053,
    name: "Hek",
    sec: 0.549668267
 }, {
    id: 30002659,
    name: "Dodixie",
    sec: 0.868406702
  }, {
    id: 30002187,
    name: "Amarr",
    sec: 1
  }],
  avoidance: [],
  routes: []
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

export const gps = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_ROUTE:
      return createRoute(state, action)
    case CLEAR_ROUTE_HISTORY:
      return Object.assign(state, {routes: []})
    case GPS_FAVORITE:
    case GPS_FAVORITE_REMOVE:
    case GPS_AVOID:
    case GPS_AVOID_REMOVE:
  }

  return state
}
