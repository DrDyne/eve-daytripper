import React from 'react'
import {
  Link
} from 'react-router-dom'
import {
  Paper,
  List,
  ListItem,
  TextField,
  Typography,
} from 'material-ui'
import ShowEmptyStockSwitch from './components/ShowEmptyStockSwitch'
import RoutesHistory from '../RoutesHistory'

export class Settings extends React.Component {
  render () {
    return (<Paper style={{
      width: this.props.width,
      height: '100%',
    }} >
      <ShowEmptyStockSwitch />
      {//TODO display percentages instead of item images
      }

      <Link to="/home"> home </Link>

      <div>
        fleet
      </div>
      
      <RoutesHistory />
    </Paper>)
  }
}
