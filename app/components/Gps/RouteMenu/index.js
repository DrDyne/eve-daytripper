import { connect } from 'react-redux'
import { RouteMenu } from './component'

export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  addFavorite: system => console.log('add favorite', system),
  deleteFavorite: system => console.log('delete favorite', system),
  deleteFromHistory: origin => console.log('delete from history', origin),

  openMenu: route => () => console.log('open menu', route)
})
export default connect(mapStateToProps, mapDispatchToProps)(RouteMenu)
