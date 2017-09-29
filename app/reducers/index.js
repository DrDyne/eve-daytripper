import { combineReducers } from 'redux'
import { layout } from './layout'
import { activeTab } from './activeTab'
import { inventory } from './inventory'
import { history } from './history'
import { user } from './user'
import { char } from './char'
import { fleet } from './fleet'

const Reducers = combineReducers({
  layout,
  activeTab,
  inventory,
  fleet,
  history,
  user,
  char,
})

export default Reducers

export const Characters = {
  rDyna: {
    id: '672641436',
    portrait: 'http://image.eveonline.com/Character/672641436_64.jpg',
  }
}
