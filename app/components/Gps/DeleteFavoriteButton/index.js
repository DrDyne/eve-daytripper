import { connect } from 'react-redux'
import { DeleteFavoriteButton } from './component'
export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  confirmDeleteFavorite: system => () => {
    //show dialog (set layout.showConfirmDeleteFromFavoritesDialog = true)
  },
  cancelDeleteFavorite: () => {
  },
  deleteFavorite: system => () => {
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFavoriteButton)
