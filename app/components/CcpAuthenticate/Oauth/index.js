import { connect } from 'react-redux'
import { oauthCallback } from 'App/actions'
import { Oauth } from './component'

export const mapStateToProps = state => ({
  name: state.char.name,
  portrait: state.char.portrait,
  isAuthenticated: !!state.char.id,
  primaryColor: state.layout.primaryColor
})

export const mapDispatchToProps = dispatch => ({
  authenticate: creds => {
    console.log('authenticating', creds)
    dispatch(oauthCallback(creds))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Oauth)
