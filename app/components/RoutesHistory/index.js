import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RoutesHistory } from './component'
import { layout } from '../../actions'

export const mapStateToProps = state => ({
  routes: state.gps.routes // not fav origin/destination
  .filter(r => !state.gps.favorites.find(fav => fav.id == r.origin.id))
  .map(r => {
    const isFavorite = state.gps.favorites.find(fav => fav.id === r.destination.id)
    return Object.assign(r, { isFavorite })
  })
  .reduce((memo, route, index, routes) => {
    const routesFromOrigin = routes.filter(r => r.origin.id === route.origin.id)
    const routesFromOriginNotFavorite = routesFromOrigin.filter(r => !r.isFavorite)

    return ( !route.isFavorite )
    ? memo.concat(route)
    : routesFromOriginNotFavorite.length
    ? memo
    : memo.find(r => r.origin.id === route.origin.id)
    ? memo
    : memo.concat(route)
  }, []),
  systems: state.history.origins,
  favorites: state.gps.favorites,
  wormholes: state.history.origins.filter(({sec}) => -0.99 === sec),
  showShortestRoutes: state.layout.showShortestRoutes
})

export default withRouter(connect(mapStateToProps)(RoutesHistory))
