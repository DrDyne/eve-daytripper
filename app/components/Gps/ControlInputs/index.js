import { connect } from 'react-redux'
import { gps } from '../../../actions'
import { ControlInputs } from './component'

export const mapStateToProps = state => ({
  search: state.gps.search
})

export const mapDispatchToProps = dispatch => ({
  search: (origin, destination) => {
    if ( origin === destination ) return

    if ( !origin || !destination ) return

    dispatch(gps.search(origin, destination))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlInputs)

//export const OriginInput = connect(mapStateToProps, mapDispatchToProps)(props => {
//  const { defaultValue } = props
//  const { onChange } = props
//
//  return <TextField
//    defaultValue={defaultValue}
//    onChange={onChange}
//    label="From"
//    style={{ flexGrow: 1 }}
//  />
//})
//
//export const DestinationInput = connect(mapStateToProps, mapDispatchToProps)(props => {
//  const { defaultValue } = props
//  const { onChange } = props
//  return <TextField
//    defaultValue={defaultValue}
//    onChange={onChange}
//    label="To"
//    style={{ flexGrow: 1 }}
//  />
//})
