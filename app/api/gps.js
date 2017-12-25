import {
  isWormhole,
  wormholeId,
  whEffectValues
} from './utils'
import whEffectLabels from './wh-effects.json'
import whSignatures from './signatures.json'

let cache = {
  baseUrl: 'https://drdyne.github.io/eve-daytripper/static',
  identified: {},
  mapSolarSystems: [],
  wh: {
    effectLabels: whEffectLabels,
    effects: {},
    signatures: null,
    statics: {},
    jClasses: {},
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
  return Promise.resolve(whSignatures)
  //return ( cache.wh.signatures )
  //? Promise.resolve(cache.wh.signatures)
  //: fetch(cache.baseUrl + '/wh/signatures.json')
  //.then(response => response.json())
  //.then(json => {
  //  cache.wh.signatures = json
  //  return json
  //})
}

// jClass = C1, C2, C3, C4, C5, C6
// effectName = Wolf-RayetStar, Pulsar, ...
const whEffectLabelsAs = (jClass, effectName) => {
  return cache.wh.effectLabels[effectName]
  .map(({base, name, neg, bad}) => {
    const value = whEffectValues(base, jClass)
    return {
      label: name,
      value,
      neg,
      bad,
    }
  })
}

const effectNames = {
  BlackHole: 'Black Hole',
  CataclysmicVariable: 'Cataclysmic Variable',
  Magnetar: 'Magnetar',
  Pulsar: 'Pulsar',
  RedGiant: 'Red giant',
  'Wolf-RayetStar': 'Wolf Rayet',
}

const whEffectsCache = system => {
  if ( 'C13' === system.jClass ) return Promise.resolve({
    effectName: effectNames['Wolf-RayetStar'],
    effects: whEffectLabelsAs('C6', 'Wolf-RayetStar')
  })

  const id = wormholeId(system)

  const whEffect = cache.wh.effects[id]
    ? Promise.resolve(cache.wh.effects)
    : fetch(cache.baseUrl + `/wh/effects/${id}.json`)
    .then(response => {
      if ( !response.ok ) throw 'no-effect'
      return response.json()
    })
    .then(json => {
      cache.wh.effects[id] = json
      return json
    })
    .catch(err => {
      if ( 'no-effect' === err )
        return Promise.resolve({})
      throw err
    })

  return whEffect
  .then(effects => {
    const whEffectName = effects[system.name]
    if ( !whEffectName ) return {}

    return {
      effectName: effectNames[whEffectName],
      effects: whEffectLabelsAs(system.jClass, whEffectName)
    }
  })
}

const whJClassesCache = system => {
  const id = wormholeId(system)
  return ( cache.wh.jClasses[id] )
  ? Promise.resolve(cache.wh.jClasses[id])
  : fetch(`${cache.baseUrl}/wh/classes/${id}.json`)
  .then(res => res.json())
  .then(json => {
    cache.wh.jClasses[id] = json
    return json
  })
}

const whStaticsCache = system => {
  const id = wormholeId(system)
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
    whStaticsCache(system)
    .then(statics => statics[system.name] || []),
    whSignaturesCache(),
    whJClassesCache(system)
    .then(jClasses => jClasses[system.name])
  ])
  .then(([statics, signatures, jClass]) => Promise.all([
    statics,
    signatures,
    jClass,
    whEffectsCache(Object.assign({}, system, { jClass }))
  ]))
  .then(([statics, signatures, jClass, {effectName, effects}]) => {
    console.log(system, statics, signatures, jClass, effectName, effects)

    return Object.assign(system, {
      wh: true,
      jClass,
      statics: statics.map(sig => Object.assign({ sig }, signatures[sig] || {})),
    },
      effectName ? { effectName } : null,
      effects ? { effects } : null,
    )
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
