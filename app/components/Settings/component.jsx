import React from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import { Route, Link, NavLink } from 'react-router-dom'
import {
  Button,
  Checkbox,
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
      <ListItem>
        <ShowEmptyStockSwitch />
      </ListItem>

      <ListItem>
        //TODO display percentages instead of item images
      </ListItem>

      <Link to="/home">
        <ListItem button>
          <ListItemText primary="home"/>
        </ListItem>
      </Link>

      <ListItem>
        fleet
      </ListItem>

      <Link to="/home/route">
        <ListItem button>
          <ListItemText primary="routes"/>
        </ListItem>
      </Link>

      <Route path="/home/route" render={() => (<div>
      <ListItem button onClick={toggleFavoriteRoutes}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary="Show favorite routes" />
        <ListItemSecondaryAction>
          <Checkbox
            onClick={toggleFavoriteRoutes}
            checked={layout.showFavoriteRoutes} />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem button onClick={toggleSafestShortestRoutes}>
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
      </ListItem>

      <RoutesHistory />

      <ListItem
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
          secondary={<span>{origins.length} routes</span>}
        />
      </ListItem>

      <Collapse in={this.state.confirmClearRoutesHistory}>
        <Route render={({history}) => (
          <ListItem dense button onClick={() => {
            clearHistory()
            this.setState({confirmClearRoutesHistory: false})
            history.push('/home/route')
          }}>
            <ListItemText secondary="confirm" />
          </ListItem>
        )} />
      </Collapse>
    </div>)} />

    </List>}
  }
