import {
  CHANGE_TAB
} from '../actions'

export const activeTab = (state=0, action) => (( action.type === CHANGE_TAB ) ? action.activeTab : state)
