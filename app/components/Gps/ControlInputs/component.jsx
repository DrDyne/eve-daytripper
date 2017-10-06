import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TextField } from 'material-ui'

export class ControlInputs extends React.Component {
  state = {
    search: {
      origin: '',
      destination: '',
    },
    identified: {
      origin: false,
      destination: false,
    }
  }

  // gps input controls
  // on input change -> identify ( origin | destination )
  // if both identified, create routes (excluding favorites), then redirect to /home/route/:origin/:destination
  // if only origin is identified, create favorite routes, then redirect to /home/route/:origin
  // if only destination is identified, do nothing

  onChange = target => event => {
    const search = Object.assign({}, this.state.search, { [target]: event.target.value })
    this.setState({ search }, this.search)
  }

  search = () => {
    const { origin, destination } = this.state.search
    console.log('searching...', origin, destination)

    if ( origin.length < 3 ) return
    if ( destination.length < 3 ) return
    if ( origin.toUpperCase() === destination.toUpperCase() ) return

    this.props.search(origin, destination)
  }

  render () {
    // working on parsing gpsControlinputs
    return <div style={{
      display: 'flex',
      flexGrow: '1',
      justifyContent: 'center',
    }}>

    <Switch>
      <Route
        path="/home/route/:origin/:destination"
        render={({match}) => {
          const { origin, destination } = match.params

          return <div style={{
            width: '100%',
            display: 'flex'
          }}>
            <TextField
              defaultValue={origin}
              onChange={this.onChange('origin')}
              label="From"
              style={{ flexGrow: 1 }}
            />

            <TextField
              defaultValue={destination}
              onChange={this.onChange('destination')}
              label="To"
              style={{ flexGrow: 1 }}
            />
          </div>}}
      />

      <Route
        path="/home/route/:origin"
        render={({match}) => {
          const { origin } = match.params

          return <div style={{
            width: '100%',
            display: 'flex'
          }}>
            <TextField
              defaultValue={origin}
              onChange={this.onChange('origin')}
              label="From"
              style={{ flexGrow: 1 }}
            />
            <TextField
              onChange={this.onChange('destination')}
              label="To"
              style={{ flexGrow: 1 }}
            />
          </div>}}
      />

      <Route
        path="/home/route"
        render={() => {

          return <div style={{
            width: '100%',
            display: 'flex'
          }}>
            <TextField
              onChange={this.onChange('origin')}
              label="From"
              style={{ flexGrow: 1 }}
            />
            <TextField
              onChange={this.onChange('destination')}
              label="To"
              style={{ flexGrow: 1 }}
            />
          </div>}}
        />
     </Switch>

    </div>
  }
}
