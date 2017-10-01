export const identified = {}
const baseUrl = 'https://drdyne.github.io/eve-daytripper'

export const get = id => {
  return fetch(baseUrl + `/static/mapSolarSystems.json`)
  .then(response => response.json())
  .then(systems => systems.find(s => id === s.solarSystemID))
  .then(system => ({
    id: system.solarSystemID,
    name: system.solarSystemName,
    sec: system.security
  }))
}

export const identify = name => {
  if ( identified[name] ) return Promise.resolve(identified[name])

  //static content served from gh-pages... check /docs/static/typeids/***.json
  //https://drdyne.github.io/eve-daytripper/static/typeids/A.json

  //return fetch(`/static/typeids/${cat}.json`)
  return fetch(baseUrl + `/static/mapSolarSystems.json`)
  .then(response => response.json())
  .then(systems => systems.find(s => name === s.solarSystemName))
  .then(({solarSystemID, solarSystemName, security}) => {
    console.log(`identified ${solarSystemID}:${solarSystemName}`)

    identified[name] = {
      id: solarSystemID,
      name: solarSystemName,
      sec: security
    }
    return identified[name]
  })
}

const Jita = '30000142'
const Hek = '30002053'
export const route = (origin={}, destination={}) => {
  const url = `https://esi.tech.ccp.is/latest/route/${origin.id||Hek}/${destination.id||Jita}/?datasource=tranquility&flag=shortest`
  return fetch(url)
  .then(response => response.json())
  .then(route => {
    console.log(route)
    return Promise.all(route.map(get))
  })
}


export default {
  identify,
  get,
  route
}
