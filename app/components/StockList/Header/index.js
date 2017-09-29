import { connect } from 'react-redux'
import { Header } from './component'

export const mapStateToProps = state => ({
  inventory: state.inventory
})

export const mapDispatchToProps = dispatch => ({
  importStockSetup: setup => {
    console.log('save stock setup as current stock', setup)
  },
  exportStockSetup: () => {
    console.log('generate JSON file to download from current stock setup')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
