import {
  FLEET_ADD_MEMBER,
  FLEET_ASSIGN,
  FLEET_INVITE,
  FLEET_KICK,
  FLEET_SET_COMMANDER,
} from '../actions'

export const initialState = {
  commander: {},
  members: []
}

export const createCommander = ({id, name, portrait}, type) => ({
  id,
  name,
  portrait,
  role: 'commander',
  type: type || 'explorer'
})

export const createMember = ({id, name, portrait}, type) => ({
  id,
  name,
  portrait,
  role: 'member',
  type: type || 'explorer',
})

export const addMember = (state, action) => {
  const member = createMember(action)
  return Object.assign({}, state, {
    members: state.members.push(member)
  })
}

export const assign = (state, action) => {
  const { id, type } = action
  if ( id === state.commander.id ) {
    const commander = createCommander(state.commander, type)
    return Object.assign({}, state, { commander })
  }

  const member = createMember(action)
  return Object.assign({}, state, {
    members: state.members.map(m => {
      if ( id !== m.id ) return m
      return Object.assign(m, {type})
    })
  })
}

export const kick = (state, id) => {
  return Object.assign({}, state, {
    members: state.members.filter(m => id !== m.id)
  })
}

export const fleet = (state=initialState, action) => {
  const { id, type } = action

  switch (action.type) {
    case FLEET_ADD_MEMBER:
      return addMember(state, action)

    case FLEET_ASSIGN:
      return assign(state, action)

    case FLEET_INVITE:
      return state

    case FLEET_KICK:
      return kick(state, id)

    case FLEET_SET_COMMANDER:
      const commander = createCommander(action)
      return Object.assign({}, state, { commander })
  }

  return state
}
