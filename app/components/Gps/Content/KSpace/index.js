import { connect } from 'react-redux'

import KSpaceActivity from './Activity'

import { Favorites } from './Favorites'
const KSpaceFavorites = connect(state => ({
  favorites: state.gps.favorites,
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes,
  showFavoriteRoutes: state.layout.showFavoriteRoutes
}))(Favorites)

import { Routes } from './Routes'
const KSpaceRoutes = connect(state => ({
  favorites: state.gps.favorites,
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes
}))(Routes)

export {
  KSpaceActivity,
  KSpaceFavorites,
  KSpaceRoutes
}
