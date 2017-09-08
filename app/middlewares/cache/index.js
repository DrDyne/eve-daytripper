export const byName = name => item => item.name === name
const typeids = fetch('/static/typeids.json')
console.log(typeids)

export const cache = store => next => action => {
  if (
  const { itemCache } = store.getState()
  const cached = itemCache.find(byName(action.name))
  return next(action)
}
