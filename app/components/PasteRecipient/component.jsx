import React from 'react'
import style from './style.scss'
import {
  Button,
  Typography
} from 'material-ui'

export class PasteRecipient extends React.Component {
  state = {
    hovered: false,
    focused: false,
    pasted: false,
  }

  focus = event => this.setState({focused: true})
  hover = event => this.setState({hovered: true})
  blur = event => this.setState({focused: false, hovered: false, pasted: false})
  paste = event => {
    this.setState({pasted: true})
    this.props.onPaste(event)
  }

  render () {
    const { hovered, focused, pasted } = this.state
    const css = {
      root: {
        background: !hovered
        ? 'red'
        : ( !focused )
        ? 'yellow'
        : ( !pasted )
        ? 'green'
        : 'orange'
      },
    }

    return (<div className={style.root}
      style={css.root}
      onPaste={this.paste}>
      <div id={style.recipient}
        onClick={this.focus}
        onMouseEnter={this.hover}
        onMouseLeave={this.blur}>
        <Typography type="headline" id={style.label}> Click and paste </Typography>
      </div>
    </div>)
  }
}
