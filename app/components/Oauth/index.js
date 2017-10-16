import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { oauthCallback } from '../../actions'
import { Oauth } from './component'


export const mapStateToProps = state => ({
  id: state.char.id,
  name: state.char.name,
  portrait: state.char.portrait
})

export const mapDispatchToProps = dispatch => ({
  authenticate: creds => {
    console.log('authenticating', creds)
    dispatch(oauthCallback(creds))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Oauth))
