import React from 'react'
import Joyride from 'react-joyride'
import steps from './steps'

export class Ride extends React.Component {
  joyride = null

  ride = ({type}) => {
    const { start, exit } = this.props
    console.log(type)

    if ( 'beacon:trigger' === type ) return start()
    if ( 'finished' === type ) return exit()
  }

  render () {
    const { children, ready, enabled } = this.props

    return !ready ? null : (
      <Joyride
        ref={e => this.joyride = e}
        run={enabled}
        debug={false}
        steps={steps}
        callback={this.ride}
        type="continuous"
        isFixed={true}
        showSkipButton={true}
        showStepsProgress={true}
        scrollToSteps={true}
        disableOverlay={true}
      />
    )
  }
}

Ride.defaultProps = {
  ready: false,
  enabled: true,
}

export default Ride
