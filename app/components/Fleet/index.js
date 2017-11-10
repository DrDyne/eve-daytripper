import { connect } from 'react-redux'
import { Fleet } from './component'
import * as actions from '../../actions/fleet'

//WIP Button
import { user } from '../../actions'
import api from '../../api'

export const mapStateToProps = state => ({
  members: state.fleet.members
})

export const mapDispatchToProps = dispatch => ({
  //WIP Button
  loadFleet: () => {
    api.user.getFleet()
    .then(fleet => {
      console.log('fleet', fleet)
      fleet.members.forEach(({id, name, role}) => {
        dispatch(actions.add({id, name, role}))
      })
    })
    .catch(err => {
      console.error(err)
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Fleet)
