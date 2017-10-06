import React from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import { Route, Link, NavLink } from 'react-router-dom'
import {
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from 'material-ui'
import ShowEmptyStockSwitch from './components/ShowEmptyStockSwitch'
import RoutesHistory from '../RoutesHistory'
import StarBorder from 'material-ui-icons/StarBorder';

export class Settings extends React.Component {
  state = {
    confirmClearRoutesHistory: false
  }

  render () {
    const { gps, layout, history } = this.props
    const { origins } = history
    const { toggleFavoriteRoutes, clearHistory } = this.props

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

      <ListItem button onClick={toggleFavoriteRoutes}>
        <ListItemText primary={ `${layout.showFavoriteRoutes ? 'hide' : 'show'} favorite routes` } />
        <ListItemIcon>
          { layout.showFavoriteRoutes
          ? <StarBorder />
          : <StarBorder style={{fill: '#f50057'}} /> }
        </ListItemIcon>
      </ListItem>

      <Link to="/home/route">
        <ListItem button>
          routes
        </ListItem>
      </Link>

      <RoutesHistory />

      <ListItem
        button
        disabled={!origins.length}
        onClick={() => {
          const confirmClearRoutesHistory = !this.state.confirmClearRoutesHistory
          this.setState({confirmClearRoutesHistory})
      }}>
        clear routes ({origins.length})
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

    </List>}
  }
