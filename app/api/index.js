import { soundex } from './utils'
export const identified = {}

export const identify = name => {
  const cat = soundex(name)
  if ( identified[name] ) return Promise.resolve(identified[name])

  //return fetch(`/static/typeids/${cat}.json`)
  return fetch(`/static/typeids.json`)
  .then(typeids => typeids.find(type => name === type.name))
  .then(({id}) => {
    identified[name] = id
    console.log(`identified ${id}:${name}`)
    return id
  })
}
