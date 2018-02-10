import React from 'react'
// 300 sec = 5 min
const Ticker = (Component, tickReset=30, delay=10 * 1000) => (
  class TickerHOC extends React.Component {
    state = {
      ticker: null,
      ticks: 0,
    }

    componentDidMount () {
      const ticker = setInterval(this.tick, delay)
      this.setState({ ticker })
    }

    componentWillUnmount () {
      clearInterval(this.state.ticker)
    }

    tick = () => {
      console.log('tick')
      const ticks = 1 + this.state.ticks
      if ( ticks < tickReset ) return this.setState({ ticks })
      const { saveProfile } = this.props
      saveProfile()
      return this.setState({ ticks: 0 })
    }

    render () {
      return <Component {...this.props} />
    }
  }
)

export default Ticker
