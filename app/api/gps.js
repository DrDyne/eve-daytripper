export const identified = {}
export const mapSolarSystem = null // cache /static/mapSolarSystem.json !
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
  const Name = name.toUpperCase()
  if ( identified[Name] ) return Promise.resolve(identified[Name])

  //static content served from gh-pages... check /docs/static/typeids/***.json
  //https://drdyne.github.io/eve-daytripper/static/typeids/A.json

  //return fetch(`/static/typeids/${cat}.json`)
  return fetch(baseUrl + `/static/mapSolarSystems.json`)
  .then(response => response.json())
  .then(systems => systems.find(s => Name === s.solarSystemName.toUpperCase()))
  .then(system => {
    if ( !system ) return Promise.reject(`Unknown system: ${Name}`)

    const { solarSystemID, solarSystemName, security } = system
    console.log(`identified ${solarSystemID}:${solarSystemName}`)

    identified[Name] = {
      id: solarSystemID,
      Name: solarSystemName,
      sec: security
    }
    return identified[Name]
  })
}

const Jita = '30000142'
const Hek = '30002053'
export const route = (origin, destination, options={shortest, safest}) => {
  const flag = options.shortest
  ? 'shortest'
  : options.safest
  ? 'secure'
  : 'shortest'

  const url = `https://esi.tech.ccp.is/latest/route/${origin.id}/${destination.id}/?datasource=tranquility&flag=${flag}`
  return fetch(url)
  .then(response => response.json())
  .then(route => Promise.all(route.map(get)))
  .then(route => route[0].id === origin.id
  ? route
  : route.reverse()) // sometimes ccp server reverses order /shrug
}

export const shortest = (origin, destination) => (
  route(origin, destination, {shortest: true})
)

export const safest = (origin, destination) => {
  route(origin, destination, {safest :true})
}

export default {
  identify,
  get,
  route,
  shortest,
  safest,
}
