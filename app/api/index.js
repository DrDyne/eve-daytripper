import { soundex } from './utils'
export const identified = {}
export const baseUrl = 'https://drdyne.github.io/eve-daytripper'
export const identify = name => {
  const cat = soundex(name)
  if ( identified[name] ) return Promise.resolve(identified[name])

  //static content served from gh-pages... check /docs/static/typeids/***.json
  //https://drdyne.github.io/eve-daytripper/static/typeids/A.json

  //return fetch(`/static/typeids/${cat}.json`)
  return fetch(baseUrl + `/static/typeids/${cat.charAt(0)}.json`)
  .then(response => response.json())
  .then(typeids => typeids[cat].find(type => name === type.name))
  .then(({id}) => {
    identified[name] = id
    console.log(`identified ${id}:${name}`)
    return id
  })
}
