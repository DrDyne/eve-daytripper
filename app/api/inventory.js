import { soundex } from './utils'
export const identified = {}

export const identify = name => {
  if ( identified[name] ) return Promise.resolve(identified[name])
  const baseUrl = 'https://drdyne.github.io/eve-daytripper'

  //static content served from gh-pages... check /docs/static/typeids/***.json
  //https://drdyne.github.io/eve-daytripper/static/typeids/A.json

  //return fetch(`/static/typeids/${cat}.json`)
  const cat = soundex(name)
  return fetch(baseUrl + `/static/typeids/${cat.charAt(0)}.json`, { cache: 'force-cache' })
  .then(response => response.json())
  .then(typeids => typeids[cat].find(type => name === type.name))
  .then(({id}) => {
    identified[name] = id
    console.log(`identified ${id}:${name}`)
    return id
  })
}

export const info = id => {
  const url = `https://esi.tech.ccp.is/latest/universe/types/${id}/`
  const query = `?datasource=tranquility&language=en-us`

  return fetch(url + query)
  .then(res => res.json())
}

export const get = charId => {
  return fetch(`/inventory`)
}

export default {
  identify,
  info
}
