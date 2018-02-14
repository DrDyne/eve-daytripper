import React from 'react'
import Snackbar, { SnackbarContent } from 'mui/Snackbar'
import IconButton from 'mui/IconButton'
import CloseIcon from 'muii/Close'
import Slide from 'mui/transitions/Slide'
import { LinearProgress } from 'mui/Progress'
import style from './style.css'

export class Notification extends React.Component {
  state = {
    open: false
  }

  componentWillReceiveProps (nextProps) {
    const shouldOpen = !this.props.loading && !!nextProps.loading
    const shouldClose = !!this.props.loading && !nextProps.loading
    if ( shouldOpen ) this.setState({ open: true })
    else if ( shouldClose ) this.setState({ open: false })
  }

  render () {
    const { loading } = this.props
    const { open } = this.state
    return (
      <Snackbar
        open={loading && open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        className={style.snackContainer}
        children={(
          <span>
            <LinearProgress />
            <SnackbarContent
              message={"saving profile..."}
              action={[
                (<IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.setState({open: false})}
                >
                  <CloseIcon />
                </IconButton>)
              ]}
            />
          </span>
        )}
      />
    )
  }
}

export default Notification
