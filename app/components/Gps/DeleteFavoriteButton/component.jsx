import React from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
} from 'material-ui'
import StarBorder from 'material-ui-icons/StarBorder'

export const DeleteFavoriteButton = props => {
  const {
    layout,
    system,
    confirmDeleteFavorite,
    cancelDeleteFavorite,
    deleteFavorite
  } = props

  return (<div>
    <IconButton onClick={confirmDeleteFavorite(system)}>
      <StarBorder />
    </IconButton>
    { system.id === layout.showConfirmDeleteFavoriteDialog && (
      <Menu open={layout.showConfirmDeleteFavoriteDialog} onRequestClose={cancelDeleteFavorite}>
        <MenuItem>
          <Button onClick={cancelDeleteFavorite}> cancel </Button>
        </MenuItem>

        <MenuItem>
          <Button onClick={deleteFavorite(system)}> delete </Button>
        </MenuItem>
      </Menu>)
    }
  </div>)
}
