import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom'

import blue from 'mui/colors/blue'
import Collapse from 'mui/transitions/Collapse'
import Avatar from 'mui/Avatar'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'mui/List'
import Typography from 'mui/Typography'

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
} from 'muii'

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
      changeTab,
      logout
    } = this.props
    const { origins } = history

    const inventoryStyle = {
      [activeTab]: { backgroundColor: layout.primaryColor },
    }

    return (<List style={{
      width: this.props.width,
      height: '100vh',
      overflowY: 'auto',
    }} >
      <ListItem button dense onClick={toggleFleetVisibility}>
        <Avatar style={{ backgroundColor: blue[900], }}> <Group /> </Avatar>
        <ListItemText
          primary="FLEET"
          secondary={ !layout.fleetVisibility && (
            1 === fleet.members.length
            ? fleet.members.find(m => m.id === fleet.commander).name
            : `${fleet.members.length} members`
          ) }
        />
      </ListItem>

      <Collapse in={layout.fleetVisibility}>
        <Fleet />
        <ListItem divider style={{marginTop: 1}}/>
      </Collapse>

      <Route render={({history}) => (
        <ListItem button dense onClick={toggleInventoryVisibility}>
          <Avatar style={{ backgroundColor: blue[900] }}>
            { 0 === activeTab
            ? <BusinessCenter />
            : 1 === activeTab
            ? <ShoppingCart />
            : '$'
            }
          </Avatar>
          <ListItemText
            primary="INVENTORY"
            secondary={
              !layout.inventoryVisibility && (
                0 === activeTab
                ? 'total'
                : 2 === activeTab
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
          onClick={changeTab(2)}
          style={{ paddingLeft: 32 }}
        >
          <Avatar style={inventoryStyle[2]}> $ </Avatar>
          <ListItemText primary="Loot"/>
        </ListItem>

        <ListItem
          button
          dense
          onClick={changeTab(1)}
          style={{ paddingLeft: 32 }}
        >
          <Avatar style={inventoryStyle[1]}> <ShoppingCart /> </Avatar>
          <ListItemText primary="Stock"/>
        </ListItem>

        { /*
        <ListItem
          button
          dense
          style={{ paddingLeft: 32 }}
        >
          <ShowEmptyStockSwitch />
        </ListItem>
        */ }

        <ListItem divider />
      </Collapse>

      <Route render={({history}) => (
        <ListItem button dense onClick={toggleNavigationVisibility}>
          <Avatar style={{ backgroundColor: blue[900] }}> <Navigation /> </Avatar>
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
            backgroundColor: layout.showFavoriteRoutes ? layout.primaryColor : null
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

      <Route path="/home" render={() => (
        <ListItem
          button
          dense
          disabled={!origins.length}
          onClick={() => {
            const confirmClearRoutesHistory = !this.state.confirmClearRoutesHistory
            this.setState({confirmClearRoutesHistory})
        }}>

          <Avatar style={{backgroundColor: blue[900]}}> <DeleteSweep /> </Avatar>

          <ListItemText
            primary="Clear routes"
            secondary={<span>{origins.length} origins / {gps.routes.length} routes</span>}
          />
        </ListItem>
      )} />

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

      <ListItem divider />

      <Route render={({history}) => (
        <ListItem
          button
          dense
          onClick={() => {
            console.log('//do addition signout logic here...')
            logout()
            history.push('/login')
          }}
        >
          <Avatar style={{ backgroundColor: blue[900] }}>
            <ExitToApp />
          </Avatar>
          <ListItemText secondary="SIGN OUT" />
        </ListItem>
      )} />

      <ListItem>
        <Typography type="caption">
          This application has been created under the EVE Developer License Agreement.
        </Typography>
      </ListItem>

    </List>)}
  }
