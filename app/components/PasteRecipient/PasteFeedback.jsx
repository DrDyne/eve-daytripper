
import React from 'react'
import { Button, IconButton } from 'mui'
import Snackbar from 'mui/Snackbar'
import CloseIcon from 'muii/Close'

export class PasteFeedback extends React.Component {
  state = {
    open: false,
    checksum: null,
    items: [],
    system: null, // system object
    lastPasted: null, // system | items
  }

  hash = s => {
    var chk = 0x12345678;
    var len = s.length;
    for (var i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }

    return (chk & 0xffffffff).toString(16);
  }

  checksum = items => {
    const str = items
    .map(i => i.qty + i.name)
    .join('-')

    return this.hash(str)
  }

  handleClose = (event, reason) => {
    //if ( 'timeout' === reason ) return;

    this.setState({open: false})
  }

  componentWillReceiveProps (nextProps) {
    const { system, items } = nextProps

    if ( !!system ) {
      if ( !this.state.system )
        return this.setState({open: true, system, lastPasted: 'system'})

      if ( system.id !== this.state.system.id )
        return this.setState({open: true, system, lastPasted: 'system' })
    }

    if ( items.length ) {
      if ( items.length !== this.state.items.length )
        return this.setState({
          open: true,
          checksum,
          items,
          lastPasted: 'items'
        })

      const checksum = this.checksum(items)

      if ( checksum !== this.state.checksum )
        return this.setState({
          open: true,
          checksum,
          items,
          lastPasted: 'items'
        })
    }
  }

  renderMessage = () => (
    <span id="message-id">
      Identified <b>
        { this.state.lastPasted === 'system' ? this.state.system.name : this.state.items.length }
      </b> { this.state.lastPasted === 'items' && 'items' }
    </span>
  )

  render () {
    const { system } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={4200}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={this.renderMessage()}
        action={[
          !!system
            ? <ShowSystemButton
                key="undo"
                system={system}
                onClick={this.handleClose}
              />
            : null,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        style={{
          marginTop: -15
        }}
      />
    )
  }
}

export default PasteFeedback

import { Route } from 'react-router-dom'
const ShowSystemButton = ({system, onClick}) => (
  <Route render={({history}) => (
    <Button
      color="accent"
      dense
      onClick={() => {
        history.push(`/home/nav/${system.name}`)
        onClick()
      }}
    >
      show
    </Button>
  )} />
)
