import { connect } from 'react-redux'
import { withTheme } from 'mui/styles'

import KSpaceActivity from './Activity'

import { Favorites } from './Favorites'
const KSpaceFavorites = withTheme()(connect(state => ({
  favorites: state.gps.favorites,
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes,
  showFavoriteRoutes: state.layout.showFavoriteRoutes
}))(Favorites))

import { Routes } from './Routes'
const KSpaceRoutes = withTheme()(connect(state => ({
  favorites: state.gps.favorites,
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes
}))(Routes))

export {
  KSpaceActivity,
  KSpaceFavorites,
  KSpaceRoutes
}
