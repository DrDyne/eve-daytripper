export const FLEET_ADD_MEMBER = 'fleet:add'
export const FLEET_ASSIGN = 'fleet:assign'
export const FLEET_INVITE = 'fleet:invite'
export const FLEET_KICK = 'fleet:kick'
export const FLEET_SET_COMMANDER = 'fleet:commander'
export const FLEET_INIT = 'fleet:init'
export const FLEET_SAVED = 'fleet:saved'

export const add = ({id, name, role="explorer"}) => ({ type: FLEET_ADD_MEMBER, id, name, role })
export const kick = id => ({ type: FLEET_KICK, id })
export const assign = (id, role="explorer") => ({ type: FLEET_ASSIGN, id, role })
export const setCommander = id => ({ type: FLEET_SET_COMMANDER, id })
export const init = ({commander, members}) => ({ type: FLEET_INIT, commander, members })
