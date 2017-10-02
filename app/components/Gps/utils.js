export const secCssId = sec => sec > 0
  ? `sec-${sec.toString().slice(0,3).replace('.', '-')}`
  : `sec-${sec.toString().slice(0,3).replace('.', '-')}`

export const securityClassLabel = sec => sec > 0.5 ? 'HS' : sec > 0 ? 'LS' : 'NS'

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
