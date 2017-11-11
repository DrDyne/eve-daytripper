import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TextField } from 'material-ui'

export class ControlInputs extends React.Component {
  state = {
    origin: '',
    destination: '',
  }

  onChange = target => event => {
    const search = Object.assign({}, this.state, { [target]: event.target.value })
    const { origin, destination } = search
    this.setState({ origin, destination }, this.search)
  }

  search = () => {
    const { origin, destination } = this.state
    console.log('searching...', origin, '/', destination)

    if ( origin.length < 3 ) return
    if ( destination.length < 3 ) return
    if ( origin.toUpperCase() === destination.toUpperCase() ) return

    this.props.search(origin, destination)
  }

  render () {
    return (<div style={{
      display: 'flex',
      flexGrow: '1',
      justifyContent: 'center',
    }}>

      <Route
        path="/home"
        render={() => (
          <div style={{
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
          </div>
        )}
      />

    </div>)
  }
}
