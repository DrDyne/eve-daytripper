import { connect } from 'react-redux'
import { AddMemberButton } from './component'

export const mapStateToProps = state => ({
  color: state.layout.primaryColor
})

export default connect(mapStateToProps)(AddMemberButton)
