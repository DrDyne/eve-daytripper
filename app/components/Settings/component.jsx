import React from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import { Route, Link, NavLink } from 'react-router-dom'
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  List,
  TextField,
  Typography,
} from 'material-ui'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List'
import {
  DeleteSweep,
  StarBorder,
  FastForward,
  FreeBreakfast,
  Navigation,
  List as ListIcon,
  Group,
  GroupAdd
} from 'material-ui-icons'

import ShowEmptyStockSwitch from './components/ShowEmptyStockSwitch'
import Fleet from '../Fleet'
import RoutesHistory from '../RoutesHistory'

export class Settings extends React.Component {
  state = {
    confirmClearRoutesHistory: false
  }

  render () {
    const { gps, layout, history } = this.props
    const { origins } = history
    const {
      toggleFavoriteRoutes,
      toggleSafestShortestRoutes,
      clearHistory
    } = this.props

    return (<List style={{
      width: this.props.width,
      height: '100%',
    }} >
      <Link to="/home">
        <ListItem button dense>
          <Avatar> <ListIcon /> </Avatar>
          <ListItemText primary="inventory"/>
        </ListItem>
      </Link>

      <ListItem button dense>
        <Avatar> <Group /> </Avatar>
        <ListItemText primary="Fleet" />
      </ListItem>

      <Fleet />

      <ListItem divider />

      <Link to="/home/nav">
        <ListItem button dense>
          <Avatar> <Navigation /> </Avatar>
          <ListItemText primary="navigation"/>
        </ListItem>
      </Link>
      { /*
      */ }

      <Route path="/home/nav" render={props => (
        <ListItem
          button
          dense
          onClick={toggleFavoriteRoutes}
        >
          <Avatar> <StarBorder /> </Avatar>
          <ListItemText primary="Show favorite routes" />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={toggleFavoriteRoutes}
              checked={layout.showFavoriteRoutes} />
          </ListItemSecondaryAction>
        </ListItem>)
      } />

      <Route path="/home/nav" render={props => (
        <ListItem
          button
          dense
          onClick={toggleSafestShortestRoutes}
        >
          <Avatar>
            { layout.showShortestRoutes
            ? <FastForward />
            : <FreeBreakfast />
            }
          </Avatar>
          <ListItemText
            primary={layout.showShortestRoutes ? 'Shortest' : 'Safest'}
            secondary="routes"
          />
        </ListItem> )
      } />

      <Route path="/home/nav" component={RoutesHistory} />

      <Route render={({history}) => (
        <Collapse in={this.state.confirmClearRoutesHistory}>
          <ListItem dense button onClick={() => {
            clearHistory()
            this.setState({confirmClearRoutesHistory: false})
            history.push('/home/nav')
          }}>
            <ListItemText primary="confirm" style={{textAlign: 'right'}}/>
          </ListItem>
        </Collapse>
      )} />

      <Route path="/home/nav" render={() => (
        <ListItem
          button
          dense
          disabled={!origins.length}
          onClick={() => {
            const confirmClearRoutesHistory = !this.state.confirmClearRoutesHistory
            this.setState({confirmClearRoutesHistory})
        }}>

          <Avatar> <DeleteSweep /> </Avatar>

          <ListItemText
            primary="Clear routes"
            secondary={<span>{origins.length} origins / {gps.routes.length} routes</span>}
          />
        </ListItem>
      )} />

      <ListItem>
        <ShowEmptyStockSwitch />
      </ListItem>

    </List>)}
  }
