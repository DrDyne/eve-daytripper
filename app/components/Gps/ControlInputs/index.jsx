import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { TextField } from 'material-ui'

export const OriginInput = props => (
<TextField
  placeholder={props.placeholder}
  value={props.value}
  label="From"
  style={{ flexGrow: 1 }}
/>)

export const DestinationInput = props => (
<TextField
  placeholder={props.placeholder}
  value={props.value}
  label="To"
  style={{ flexGrow: 1 }}
/>)

export const ControlInputs = props => (<Switch>
  <Route path="/home/route/:origin/:destination" component={ withRouter(({match}) => (<div {...props}>
    <OriginInput value={match.params.origin}/>
    <DestinationInput value={match.params.destination} />
  </div>) )} />

  <Route path="/home/route/:origin" component={ withRouter(({match}) => (<div {...props}>
    <OriginInput value={match.params.origin}/>
    <DestinationInput />
  </div>) )} />

  <Route path="/home/route" component={() => (<div {...props}>
    <OriginInput />
    <DestinationInput />
  </div>) } />

</Switch>)
