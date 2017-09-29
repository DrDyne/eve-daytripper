import { connect } from 'react-redux'
import { Footer } from './component'

export const mapStateToProps = state => ({
  inventory: state.inventory,
  history: state.history
})

export const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
