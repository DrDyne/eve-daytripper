import {
  gps,
  INPUT_PASTE,
} from 'App/actions'

const events = [
  [ gps.GPS_IDENTIFIED_SYSTEM,
    ({type, system}) => {
      gtag('event', type, { event_category: 'gps', event_label: system.name })
      gtag('event', type+'_sec', { event_category: 'gps', event_label: system.sec })
    }
  ],
  [ gps.CREATE_ROUTE,
    ({type, systems}) => {
      const origin = systems.shortest[0].name
      const dest = systems.shortest.slice(-1)[0].name
      gtag('event', type, { event_category: 'gps', event_label: `${origin}:${dest}`})
      gtag('event', type, { event_category: 'gps', event_label: 'route:length', value: systems.shortest.length})
      gtag('event', type, { event_category: 'gps', event_label: 'route:length', value: systems.safest.length})
  } ],
  [ gps.DELETE_SYSTEM,
    ({type, system}) => gtag('event', type, { event_category: 'input', event_label: system.name })
  ],
  [ INPUT_PASTE,
    ({type, raw}) => gtag('event', type, { event_category: 'input', event_label: raw.length })
  ],
  [ 'profile:chunk',
    ({chunkType, chunk}) => {
      if ( 'all' === chunkType ) {
        const { gps } = chunk
        const uniqueOrigins = new Set( gps.routes.map(r => r.origin.id) )
        const uniqueDest = new Set( gps.routes.map(r => r.destination.id) )
        gtag('event', 'gps', { event_label: 'size', value: gps.routes.length })
        gtag('event', 'gps', { event_label: 'origins', value: uniqueOrigins.size })
        gtag('event', 'gps', { event_label: 'destinations', value: uniqueDest.size })
        // do something smart
      }

      if ( 'inventory' === chunkType ) {
        const { inventory } = chunk
        const sumQty = (x=0, {qty}) => x + qty
        gtag('event', 'inventory', { event_label: 'size', value: inventory.items.length })
        gtag('event', 'inventory', { event_label: 'count', value: inventory.items.reduce(sumQty) })
        gtag('event', 'stock', { event_label: 'size', value: inventory.stock.length })
        gtag('event', 'stock', { event_label: 'count', value: inventory.stock.reduce(sumQty) })
        gtag('event', 'inventory', { event_label: 'capacity', value: inventory.capacity })
      }
    }
  ]
]

export const tracker = store => next => action => {
  const event = events.find(([name]) => action.type === name)
  if ( !event ) return next(action)

  const [, track] = event
  console.log({tracker: action.type})
  track(action, store.getState())

  return next(action)

}


export default tracker
