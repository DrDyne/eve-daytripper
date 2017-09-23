import { connect } from 'react-redux'
import { InfoButton } from './component'

export const mapDispatchToProps = dispatch => ({
  fetchInfo: id => {
    console.log('fetch item:'+ id)
  }
})

export default connect(null, mapDispatchToProps)(InfoButton)
