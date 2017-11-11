export const FLEET_ADD_MEMBER = 'fleet:add'
export const FLEET_ASSIGN = 'fleet:assign'
export const FLEET_INVITE = 'fleet:invite'
export const FLEET_KICK = 'fleet:kick'
export const FLEET_SET_COMMANDER = 'fleet:commander'

export const add = ({id, name, role}) => ({ type: FLEET_ADD_MEMBER, id, name, role })
export const kick = id => ({ type: FLEET_KICK, id })
export const assign = (id, role) => ({ type: FLEET_ASSIGN, id, role })