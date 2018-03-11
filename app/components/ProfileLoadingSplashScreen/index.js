import { connect } from 'react-redux'
import { withTheme } from 'mui/styles'
import Component from './component'

export const mapStateToProps = ({user, layout, fleet={members:[]}}) => ({
  show: user.authenticating || layout.profileLoading,
  profile: fleet.members.find(m => m.id === fleet.commander),
})

export default withTheme()(connect(mapStateToProps)(Component))
