import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { oauthCallback } from '../../actions'
import { Oauth } from './component'


export const mapStateToProps = state => ({
  char: state.char
})

export const mapDispatchToProps = dispatch => ({
  authenticate: creds => {
    console.log('authenticating', creds)
    dispatch(oauthCallback(creds))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Oauth))
