import { combineReducers } from 'redux'

import { activeTab } from './activeTab'
import { char } from './char'
import { fleet } from './fleet'
import { gps } from './gps'
import { history } from './history'
import { inventory } from './inventory'
import { layout } from './layout'
import { user } from './user'

const Reducers = combineReducers({
  activeTab,
  char,
  inventory,
  fleet,
  gps,
  history,
  layout,
  user,
})

export default Reducers

//export const Characters = {
//  rDyna: {
//    id: '672641436',
//    portrait: 'http://image.eveonline.com/Character/672641436_64.jpg',
//  }
//}
