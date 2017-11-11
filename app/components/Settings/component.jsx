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
  BusinessCenter,
  DeleteSweep,
  ExitToApp,
  StarBorder,
  FastForward,
  FreeBreakfast,
  Navigation,
  List as ListIcon,
  Group,
  GroupAdd,
  ShoppingCart
} from 'material-ui-icons'

import ShowEmptyStockSwitch from './components/ShowEmptyStockSwitch'
import Fleet from '../Fleet'
import RoutesHistory from '../RoutesHistory'

export class Settings extends React.Component {
  state = {
    confirmClearRoutesHistory: false,
  }

  render () {
    const {
      gps,
      layout,
      history,
      fleet,
      activeTab,
      toggleFavoriteRoutes,
      toggleSafestShortestRoutes,
      toggleInventoryVisibility,
      toggleFleetVisibility,
      toggleNavigationVisibility,
      clearHistory,
      changeTab
    } = this.props
    const { origins } = history

    const inventoryStyle = {
      [activeTab]: { backgroundColor: 'red' },
    }

    return (<List style={{
      width: this.props.width,
      height: '100%',
    }} >
      <ListItem button dense onClick={toggleFleetVisibility}>
        <Avatar> <Group /> </Avatar>
        <ListItemText
          primary="FLEET"
          secondary={ !layout.fleetVisibility && (
            1 === fleet.members.length
            ? fleet.members[0].name
            : `${fleet.members.length} members`
          ) }
        />
      </ListItem>

      <Collapse in={layout.fleetVisibility}>
        <Fleet />
        <ListItem divider />
      </Collapse>

      <Route render={({history}) => (
        <ListItem button dense onClick={toggleInventoryVisibility}>
          <Avatar>
            { 0 === activeTab
            ? <BusinessCenter />
            : 1 === activeTab
            ? '$'
            : <ShoppingCart />
            }
          </Avatar>
          <ListItemText
            primary="INVENTORY"
            secondary={
              !layout.inventoryVisibility && (
                0 === activeTab
                ? 'total'
                : 1 === activeTab
                ? 'loot'
                : 'stock'
              )
          } />
        </ListItem>
      )} />

      <Collapse in={layout.inventoryVisibility}>
        <ListItem
          button
          dense
          onClick={changeTab(0)}
          style={{ paddingLeft: 32 }}
        >
          <Avatar style={inventoryStyle[0]}> <BusinessCenter /> </Avatar>
          <ListItemText primary="Total" inset/>
        </ListItem>

        <ListItem
          button
          dense
          onClick={changeTab(1)}
          style={{ paddingLeft: 32 }}
        >
          <Avatar style={inventoryStyle[1]}> $ </Avatar>
          <ListItemText primary="Loot"/>
        </ListItem>

        <ListItem
          button
          dense
          onClick={changeTab(2)}
          style={{ paddingLeft: 32 }}
        >
          <Avatar style={inventoryStyle[2]}> <ShoppingCart /> </Avatar>
          <ListItemText primary="Stock"/>
        </ListItem>

        <ListItem
          button
          dense
          style={{ paddingLeft: 32 }}
        >
          <ShowEmptyStockSwitch />
        </ListItem>

        <ListItem divider />
      </Collapse>

      <Route render={({history}) => (
        <ListItem button dense onClick={toggleNavigationVisibility}>
          <Avatar> <Navigation /> </Avatar>
          <ListItemText
            primary="NAVIGATION"
            secondary={
              !layout.navigationVisibility &&
              (layout.showFavoriteRoutes && layout.showShortestRoutes
                ? 'shortest, show fav.'
                : !layout.showFavoriteRoutes && layout.showShortestRoutes
                ? 'shortest, hide fav.'
                : !layout.showFavoriteRoutes && !layout.showShortestRoutes
                ? 'safest, hide fav.'
                : 'safest, show fav.'
              )
            }
          />
        </ListItem>
      )} />

      <Collapse in={layout.navigationVisibility}>
        <ListItem
          button
          dense
          onClick={toggleSafestShortestRoutes}
          style={{
            paddingLeft: 32
          }}
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
        </ListItem>

        <ListItem
          button
          dense
          onClick={toggleFavoriteRoutes}
          style={{
            paddingLeft: 32
          }}
        >
          <Avatar style={{
            backgroundColor: layout.showFavoriteRoutes ? 'rgb(245, 0, 87)' : null
          }}>
            <StarBorder />
          </Avatar>
          <ListItemText
            primary="Favorite routes"
            secondary={layout.showFavoriteRoutes
              ? 'Show'
              : 'Hide'
            }
          />
        </ListItem>
      </Collapse>

      <RoutesHistory />

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

      <Route path="/home" render={() => (
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

      <ListItem button dense>
        <Avatar>
          <ExitToApp />
        </Avatar>
        <ListItemText secondary="SIGN OUT" />
      </ListItem>

    </List>)}
  }
