import { connect } from 'react-redux'
import { RouteMenu } from './component'

export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  deleteFavorite: system => () => console.log('delete favorite', system),
  addFavorite: system => () => console.log('add favorite', system),
  deleteAvoided: system => () => console.log('delete avoided', system),
  addAvoided: system => () => console.log('add avoided', system),
  deleteFromHistory: origin => () => console.log('delete from history', origin),

  openMenu: route => () => console.log('open menu', route)
})
export default connect(mapStateToProps, mapDispatchToProps)(RouteMenu)
