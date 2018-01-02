import React from 'react'
import style from './style.scss'
import { Redirect } from 'react-router-dom'
import Collapse from 'mui/transitions/Collapse'
import {
  Paper,
  LinearProgress,
  Typography
} from 'mui'
import { PasteInstructions } from './PasteInstructions'
import PasteResults from './PasteResults'
import { PasteStatusBar } from './PasteStatusBar'

export class PasteRecipient extends React.Component {
  state = {
    hovered: false,
    focused: false,
    pasted: false,
  }

  focus = event => this.setState({focused: true, pasted: false})
  hover = event => this.setState({hovered: true})
  blur = event => this.setState({focused: false, hovered: false, pasted: false})
  paste = event => {
    this.setState({pasted: true})
    this.props.onPaste(event)
  }

  render () {
    const { hovered, focused, pasted } = this.state
    const { busy, items, system } = this.props
    const cssOverride = {
      root: {
        background: 'white',
        marginBottom: 4,
        //background: !hovered
        //? 'red'
        //: ( !focused )
        //? 'yellow'
        //: ( !pasted )
        //? 'green'
        //: 'orange'
      },
    }

    const step = !hovered
    ? 0
    : !focused
    ? 1
    : !pasted
    ? 2
    : 3

    return (
      <Paper className={style.root}
        style={cssOverride.root}
        elevation={2}
        onPaste={this.paste}>

        <div id={style.recipient}
          onClick={this.focus}
          onMouseEnter={this.hover}
          onMouseLeave={this.blur}>
          <PasteInstructions step={step} />
        </div>

        <PasteStatusBar step={step} busy={busy} />

        <PasteFeedback items={items} system={system} />

      </Paper>
    )
  }
}

import { Button, IconButton } from 'mui'
import Snackbar from 'mui/Snackbar'
import CloseIcon from 'muii/Close'

export class PasteFeedback extends React.Component {
  state = {
    open: false,
    checksum: null,
    items: [],
    system: null,
    lastPasted: null, // system | items
  }

  checksum = items => {
    return items.length
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
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={this.state.open}
        autoHideDuration={4200}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={this.renderMessage()}
        action={[
          //<Button key="undo" color="accent" dense onClick={this.handleClose}>
          //  UNDO
          //</Button>,
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
