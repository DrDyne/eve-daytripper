import React from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import { Route, Link, NavLink } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Typography,
} from 'material-ui'
import ShowEmptyStockSwitch from './components/ShowEmptyStockSwitch'
import RoutesHistory from '../RoutesHistory'
import DeleteSweep from 'material-ui-icons/DeleteSweep'
import StarBorder from 'material-ui-icons/StarBorder'
import FastForward from 'material-ui-icons/FastForward'
import FreeBreakfast from 'material-ui-icons/FreeBreakfast'
import Navigation from 'material-ui-icons/Navigation'
import ListIcon from 'material-ui-icons/List'

export class Settings extends React.Component {
  state = {
    confirmClearRoutesHistory: false
  }

  render () {
    const { gps, layout, history } = this.props
    const { origins } = history
    const { toggleFavoriteRoutes, toggleSafestShortestRoutes, clearHistory } = this.props

    return <List style={{
      width: this.props.width,
      height: '100%',
    }} >
      <Link to="/home">
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="inventory"/>
        </ListItem>
      </Link>

      <ListItem>
        fleet
      </ListItem>

      <ListItem divider />

      <Link to="/home/route">
        <ListItem button>
          <ListItemIcon>
            <Navigation />
          </ListItemIcon>
          <ListItemText primary="navigation"/>
        </ListItem>
      </Link>

      <Route path="/home/route" render={props => (<ListItem
        button
        onClick={toggleFavoriteRoutes}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Show favorite routes" />
        <ListItemSecondaryAction>
          <Checkbox
            onClick={toggleFavoriteRoutes}
            checked={layout.showFavoriteRoutes} />
        </ListItemSecondaryAction>
      </ListItem>) } />

      <Route path="/home/route" render={props => (<ListItem
        button
        onClick={toggleSafestShortestRoutes}>
        <ListItemIcon>
          { layout.showShortestRoutes
          ? <FastForward />
          : <FreeBreakfast />
          }
        </ListItemIcon>
        <ListItemText
          primary={layout.showShortestRoutes ? 'Shortest' : 'Safest'}
          secondary="routes"
        />
        <ListItemSecondaryAction>
          <Checkbox
            onClick={toggleSafestShortestRoutes}
            checked={layout.showShortestRoutes}
          />
        </ListItemSecondaryAction>
      </ListItem> )} />

      <Route path="/home/route" component={RoutesHistory} />

      <Route render={({history}) => ( <Collapse in={this.state.confirmClearRoutesHistory}>
          <ListItem dense button onClick={() => {
            clearHistory()
            this.setState({confirmClearRoutesHistory: false})
            history.push('/home/route')
          }}>
            <ListItemText primary="confirm" style={{textAlign: 'right'}}/>
          </ListItem>
      </Collapse> )} />

      <Route path="/home/route" render={() => ( <ListItem
        button
        disabled={!origins.length}
        onClick={() => {
          const confirmClearRoutesHistory = !this.state.confirmClearRoutesHistory
          this.setState({confirmClearRoutesHistory})
      }}>

        <ListItemIcon>
          <DeleteSweep />
        </ListItemIcon>

        <ListItemText
          primary="Clear routes"
          secondary={<span>{origins.length} origins / {gps.routes.length} routes</span>}
        />
      </ListItem> )} />

      <ListItem>
        <ShowEmptyStockSwitch />
      </ListItem>

    </List>}
  }
