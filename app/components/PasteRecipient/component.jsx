import React from 'react'
import style from './style.scss'
import Collapse from 'mui/transitions/Collapse'
import {
  Paper,
  LinearProgress,
  Typography
} from 'mui'
import { PasteInstructions } from './PasteInstructions'
import { PasteStatusBar } from './PasteStatusBar'
import PasteFeedback from './PasteFeedback'

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
