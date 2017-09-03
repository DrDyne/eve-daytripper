import { combineReducers } from 'redux'
import { layout } from './layout'
import { activeTab } from './activeTab'
import { inventory } from './inventory'

const Reducers = combineReducers({
  layout,
  activeTab,
  inventory,
})

export default Reducers

export const Characters = {
  rDyna: {
    id: '672641436',
    portrait: 'http://image.eveonline.com/Character/672641436_64.jpg',
  }
}
