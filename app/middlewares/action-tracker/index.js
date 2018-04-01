import {
  gps,
  INPUT_PASTE,
  PROFILE_CHUNK,
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
  [ PROFILE_CHUNK,
    ({chunkType, chunk}) => {
      const { fleet, inventory, origins, routes, favorites, avoidance } = chunk
      
      if ( 'all' === chunkType ) {
        gtag('event', 'gps', { event_label: 'size', value: routes.length })
        gtag('event', 'gps', { event_label: 'favorites', value: favorites.length })

        const uniqueOrigins = new Set( routes.map(r => r.origin.id) )
        const uniqueDest = new Set( routes.map(r => r.destination.id) )
        gtag('event', 'gps', { event_label: 'origins', value: uniqueOrigins.size })
        gtag('event', 'gps', { event_label: 'destinations', value: uniqueDest.size })
        // do something smart
      }

      if ( 'inventory' === chunkType ) {
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
