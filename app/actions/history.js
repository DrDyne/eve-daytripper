import { HISTORY_INIT } from './index'
export const HISTORY_SAVED = 'history:saved'

export const init = origins => ({ type: HISTORY_INIT, origins})
