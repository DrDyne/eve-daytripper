export const dispatchLogger =  store => next => action => {
  if ( action.status )
    console.groupCollapsed(`${action.type} (${action.status})`)
  else console.groupCollapsed(action.type)

  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}
