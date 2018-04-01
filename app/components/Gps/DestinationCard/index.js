import { connect } from 'react-redux'
import DestinationCard from './component'

const mapStateToProps = ({gps}) => ({
  routes: gps.routes
})

export default connect(mapStateToProps)(DestinationCard)
