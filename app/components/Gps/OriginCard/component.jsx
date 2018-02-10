import React from 'react'
import { Route } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from 'material-ui'
import { Link } from 'react-router-dom'
import { whEffectValues } from 'App/api/utils'
import { SystemSecAvatar } from 'App/components/SystemSecAvatar'
import ListItemButtonLink from 'App/components/ListItemButtonLink'

import List, { ListItem, ListItemText } from 'mui/List'
import { ListSubheader } from 'mui/List'

export const OriginCard = ({system, deleteFromHistory}) => (
  <List style={{ flexShrink: 1 }}>
    <ListSubheader style={{background: 'white', padding: 0}} component="div">
      <ListItem style={{
        border: '1px solid #eee'
      }}>
        <ListItemText
          primary={system.name}
          secondary={(
            <span>
              <SystemSecAvatar system={system} />
              { system.wh
              ? system.jClass
              : system.sec.toFixed(2)
              }
            </span>
          )}
          style={{
            textAlign: 'center',
            padding: 0
          }}
        />
      </ListItem>
    </ListSubheader>

    <ListItemButtonLink
      href={`http://evemaps.dotlan.net/system/${system.name}`}
      target="_blank"
      content={ <Typography type="caption"> DOTLAN </Typography> }
    />

    <ListItemButtonLink
      href={`https://zkillboard.com/system/${system.id}/`}
      target="_blank"
      content={ <Typography type="caption"> ZKILL </Typography> }
    />

    <Route exact path="/home/nav/:origin" render={() => (
      <DeleteFromHistoryListItem system={system} onClick={deleteFromHistory(system)}/>
    ) } />

    <ListItem style={{display: 'flex'}} />
  </List>
)

import { Collapse } from 'mui/transitions'
class DeleteFromHistoryListItem extends React.Component {
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
          style={{justifyContent: 'center'}}
        >
          <Typography variant="caption">
            Delete
          </Typography>
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
