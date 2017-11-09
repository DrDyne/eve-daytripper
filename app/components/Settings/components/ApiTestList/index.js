import { ApiTestList } from './component'
import { connect } from 'react-redux'

import { api } from '../../../../api'

export const mapStateToProps = state => ({
})

export const mapDispatchToProps = dispatch => {
  apiGetUser: () => {
  },
  apiGetInventory: () => {
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiTestList)
