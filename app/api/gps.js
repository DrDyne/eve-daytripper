import {
  isWormhole,
  wormholeId
} from './utils'

let cache = {
  baseUrl: 'https://drdyne.github.io/eve-daytripper/static',
  identified: {},
  mapSolarSystems: [],
  wh: {
    effects: null,
    signatures: null,
    statics: {},
  }
}

const mapSolarSystemsCache = () => {
  return ( cache.mapSolarSystems.length )
  ? Promise.resolve(cache.mapSolarSystems)
  : fetch(cache.baseUrl + `/mapSolarSystems.json`)
  .then(response => response.json())
  .then(json => {
    cache.mapSolarSystems = json
    return json
  })
}

const whSignaturesCache = () => {
  return ( cache.wh.signatures )
  ? Promise.resolve(cache.wh.signatures)
  : fetch(cache.baseUrl + '/wh/signatures.json')
  .then(response => response.json())
  .then(json => {
    cache.wh.signatures = json
    return json
  })
}

const whEffectsCache = () => {
  return ( cache.wh.effects )
  ? Promise.resolve(cache.wh.effects)
  : fetch(cache.baseUrl + '/wh/effects.json')
  .then(response => response.json())
  .then(json => {
    cache.wh.effects = json
    return json
  })
}

const whStaticsCache = id => {
  return ( cache.wh.statics[id] )
  ? Promise.resolve(cache.wh.statics[id])
  : fetch(`${cache.baseUrl}/wh/statics/${id}.json`)
  .then(response => response.json())
  .then(json => {
    cache.wh.statics[id] = json
    return json
  })
}

export const get = id => {
  return mapSolarSystemsCache()
  .then(systems => systems.find(s => id === s.solarSystemID))
  .then(system => ({
    id: system.solarSystemID,
    name: system.solarSystemName,
    sec: system.security
  }))
}

export const identify = name => {
  const Name = name.toUpperCase()
  if ( cache.identified[Name] ) return Promise.resolve(cache.identified[Name])

  //static content served from gh-pages... check /docs/static/typeids/***.json
  //https://drdyne.github.io/eve-daytripper/static/typeids/A.json

  //return fetch(`/static/typeids/${cat}.json`)
  return mapSolarSystemsCache()
  .then(systems => systems.find(s => Name === s.solarSystemName.toUpperCase()))
  .then(system => {
    if ( !system ) return Promise.reject(`Unknown system: ${Name}`)

    const { solarSystemID, solarSystemName, security } = system
    console.log(`identified ${solarSystemID}:${solarSystemName}`)

    cache.identified[Name] = {
      id: solarSystemID,
      name: solarSystemName,
      sec: security
    }
    return cache.identified[Name]
  })
  .then(system => isWormhole(system.name) ? identifyWormhole(system) : system)
}

export const identifyWormhole = system => {
  console.log(system)

  return Promise.all([
    whStaticsCache(wormholeId(system))
    .then(statics => statics[system.name] || []),
    whSignaturesCache(),
    whEffectsCache(wormholeId(system))
    .then(effects => effects[system.name])
  ])
  .then(([statics, signatures, effects]) => {
    console.log(system, statics, signatures, effects)

    return Object.assign(system, {
      wormhole: true,
      statics: statics.map(sig => Object.assign({ sig }, signatures[sig] || {})),
      effects,
    })
  })

}

const Jita = '30000142'
const Hek = '30002053'
export const route = (origin, destination, options={shortest, safest}) => {
  if ( isWormhole(origin.name) )
    return Promise.reject({"error":"No route found", isWormhole: 'origin'})

  if ( isWormhole(destination.name) )
    return Promise.reject({"error":"No route found", isWormhole: 'destination'})

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

export const safest = (origin, destination) => (
  route(origin, destination, {safest :true})
)

export default {
  identify,
  get,
  route,
  shortest,
  safest,
}
