import { connect } from 'react-redux'
import {
  deleteHistory,
  addFavorite,
  deleteFavorite,
} from 'App/actions/gps'
import MoreMenu from './component'

const mapStateToProps = ({gps}) => ({
  favorites: gps.favorites
})

const mapDispatchToProps = dispatch => ({
  deleteFromHistory: system => event => dispatch(deleteHistory(system)),
  addFavorite: system => event => dispatch(addFavorite(system)),
  removeFavorite: system => event => dispatch(deleteFavorite(system)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoreMenu)
