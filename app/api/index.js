export const identified = {}

export const identify = name => {
  if ( identified[name] ) return Promise.resolve(identified[name])

  return fetch('/static/typeids.json')
  .then(typeids => {
    return typeids.find(type => name === type.name)
  })
  .then(({id}) => {
    identified[name] = id
    console.log(`identified ${id}:${name}`)
    return id
  })
}
