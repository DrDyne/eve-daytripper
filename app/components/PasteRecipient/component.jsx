import React from 'react'
import style from './style.scss'
import {
  Typography
} from 'material-ui'

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
    const { parsedItems } = this.props
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
        <Typography id={style.label} type="headline"> Click and paste </Typography>
        { parsedItems > 0 && (<div>
          <Typography id={style['label-caption']} type="caption" align="right">
            {parsedItems} items parsed
          </Typography>
        </div>) }
      </div>
    </div>)
  }
}
