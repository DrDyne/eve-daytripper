import {
  FLEET_ADD_MEMBER,
  FLEET_ASSIGN,
  FLEET_INVITE,
  FLEET_KICK,
  FLEET_INIT,
  FLEET_SET_COMMANDER,
} from '../actions/fleet'

export const initialState = {
  commander: null,
  members: []
}

export const createMember = ({id, name}, role) => ({
  id,
  name,
  role: role || 'explorer',
})

export const addMember = (state, action) => {
  const { id, name, role } = action
  const member = createMember({id, name}, role)
  return Object.assign({}, state, { members: [member]}) // disable when app handles multiple fleet members
  const members = [...state.members, member]
  return Object.assign({}, state, { members })
}

export const assign = (state, action) => {
  const { id, role } = action
  if ( id === state.commander.id ) {
    const commander = createCommander(state.commander, role)
    return Object.assign({}, state, { commander })
  }

  const member = createMember(action)
  return Object.assign({}, state, {
    members: state.members.map(m => {
      if ( id !== m.id ) return m
      return Object.assign(m, {role})
    })
  })
}

export const kick = (state, id) => {
  return Object.assign({}, state, {
    members: state.members.filter(m => id !== m.id)
  })
}

export const assignCommander = (state, id) => {
  return Object.assign({}, state, { commander: id })
}

export const init = (state, action) => {
  const { members } = action
  return Object.assign({}, initialState, { members })
}

export const fleet = (state=initialState, action) => {
  const { id, role } = action

  switch (action.type) {
    case FLEET_ADD_MEMBER:
      return addMember(state, action)

    case FLEET_ASSIGN:
      return assign(state, action)

    case FLEET_INVITE:
      return state

    case FLEET_KICK:
      return kick(state, id)

    case FLEET_INIT:
      return init(state, action)

    case FLEET_SET_COMMANDER:
      return assignCommander(state, id)
  }

  return state
}
