import { connect } from 'react-redux'
import { OriginCard } from './component'

const mapStateToProps = ({gps}) => ({
  favorites: gps.favorites
})

export default connect(mapStateToProps)(OriginCard)
