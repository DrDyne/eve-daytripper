export const colors = [
  'sec-1-0', // 1.0
  'sec-0-9', // 0.9
  'sec-0-8', // 0.8
  'sec-0-7', // 0.7
  'sec-0-6', // 0.6
  'sec-0-5', // 0.5
  'sec-0-4', // 0.4
  'sec-0-3', // 0.3
  'sec-0-2', // 0.2
  'sec-0-1', // 0.1
  'sec-0-0', // 0.0
]

export const secCssId = systemSec => colors.reduce((memo, hex, index) => {
  const sec = 1 - (index/10)
  return systemSec > sec ? memo : hex
}, 'sec-0-0')

export const securityClassLabel = sec => sec > 0.45 ? 'HS' : sec > 0.05 ? 'LS' : 'NS'

export const byId = (origin, destination) => route => {
  return origin.id === route.origin.id
  && destination.id === route.destination.id
}

export const byName = (originName, destinationName) => route => {
  return originName === route.origin.name
  && destinationName === route.destination.name
}

export const byOriginName = name => route => name === route.origin.name

export const shortRoute = systems => (systems.reduce((memo, system) => {
  const secClass = securityClassLabel(system.sec)

  if ( !memo.systems.length ) return {
    lastSec: secClass,
    jumps: 1,
    systems: [{
      class: secClass,
      jumps: 1,
      worstSec: system.sec,
      systems: [system],
    }]
  }

  else if ( secClass !== memo.lastSec ) {
    return Object.assign(memo, {
      lastSec: secClass,
      jumps: memo.jumps + 1,
    }, {
      systems: [ ...memo.systems, {
        class: secClass,
        jumps: 1,
        worstSec: system.sec,
        systems: [system],
      } ]
    })
  }

  else {
    const lastClass = memo.systems.slice().pop()
    return Object.assign(memo, {
      jumps: memo.jumps + 1,
      systems: [ ...memo.systems.slice(0, -1), {
        class: lastClass.class,
        jumps: lastClass.jumps + 1,
        worstSec: Math.min(system.sec, lastClass.worstSec),
        systems: [...lastClass.systems, system],
      }]
    })
  }
}, {lastSec: null, systems: [], jumps: 0}))
