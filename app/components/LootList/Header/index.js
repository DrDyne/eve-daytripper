import { connect } from 'react-redux'
import { Header } from './component'
import { setCapacity } from '../../../actions'

export const mapStateToProps = state => ({
  inventory: state.inventory
})

export const mapDispatchToProps = dispatch => ({
  setCapacity: event => {
    const value = parseInt(event.target.value)
    if ( !Number.isInteger(value) ) return
    if ( value < 5 ) return dispatch(setCapacity(5))
    if ( value > 9999999 ) return dispatch(setCapacity(9999999))

    return dispatch(setCapacity(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
