import React from 'react'
import Typography from 'mui/Typography'
import List, {
  ListItem,
  ListItemText,
  ListItemIcon
} from 'mui/List'
import { Collapse } from 'mui/transitions'

import Delete from 'muii/Delete'
import StarBorder from 'muii/StarBorder';
import ExpandMore from 'muii/ExpandMore'
import ExpandLess from 'muii/ExpandLess'

class MoreMenu extends React.Component {
  state = { showMore: false }

  toggleMenu = () => {
    const showMore = !this.state.showMore
    this.setState({showMore})
  }

  render () {
    const { showMore } = this.state
    const {
      system,
      favorites,
      addFavorite,
      removeFavorite,
      deleteFromHistory
    } = this.props
    const isFavorite = favorites.find(({id}) => id === system.id)

    return (
      <div>
        <ListItem button disabled>
        </ListItem>

        { isFavorite ? (
          <ListItem button onClick={removeFavorite(system)}>
            <ListItemIcon>
              <StarBorder  style={{fill: '#bdbdbd'}} />
            </ListItemIcon>
            <ListItemText inset primary="Remove favorite" />
          </ListItem>
        )
        : (
          <ListItem button onClick={addFavorite(system)}>
            <ListItemIcon>
              <StarBorder  style={{fill: '#F50057'}} />
            </ListItemIcon>
            <ListItemText inset primary="Set favorite" />
          </ListItem>
        ) }


        <DeleteFromHistoryListItem system={system} onClick={deleteFromHistory(system)}/>

      </div>
    )
  }
}

export class DeleteFromHistoryListItem extends React.Component {
  state = { showConfirm: false }

  render () {
    const { system, onClick } = this.props

    return (
      <div>
        <ListItem
          button
          onClick={() => {
            const showConfirm = !this.state.showConfirm
            this.setState({ showConfirm })
          }}
        >
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItem>

        <Collapse in={this.state.showConfirm}>
          <ListItem
            button
            onClick={() => {
              onClick()
              this.setState({ showConfirm: false })
            }}
            style={{justifyContent: 'flex-end'}}
          >
            <Typography variant="caption"> Confirm <u>Delete</u>? </Typography>
          </ListItem>
        </Collapse>
      </div>
    )
  }
}

export default MoreMenu
