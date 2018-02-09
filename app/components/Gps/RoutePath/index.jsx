import React from 'react'
import {
  Avatar,
  Badge,
  Typography
} from 'material-ui'
import List, { ListItem, ListItemText } from 'material-ui/List'
import ListItemButtonLink from 'App/components/ListItemButtonLink'
import * as utils from '../utils'

import RoutePathDivider from './Divider'
export {
  RoutePathDivider
}

const PREVIEW_SMALL = 'small'
export const RoutePath = ({systems, previewSize, routeButton=true}) => {
  const condensedRoute = utils.shortRoute(systems)
  const [ routeOrigin, routeDestination ] = [ systems.slice()[0], systems.slice().pop() ]

  return (
    <List style={{
      padding: PREVIEW_SMALL === previewSize ? 0 : 'default'
    }}>
      <ListItem style={{
        paddingLeft: 0,
        paddingRight: 0,
        padding: PREVIEW_SMALL === previewSize ? 0 : 'default',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
          { condensedRoute.systems.map(s => {
            const [ origin, destination ] = [ s.systems[0], s.systems.slice().pop() ]
            return (
              <div
                key={`${s.class}:${s.jumps}:${origin.name}-${destination.name}`}
                style={{
                  display: 'flex',
                  width: PREVIEW_SMALL === previewSize ? '1.2em' : '1.8em',
                  flexDirection: 'column-reverse',
                  alignItems: 'center',
                  zIndex: 3
                }}
              >
                <Typography type="caption">
                  {s.class}
                </Typography>

                <Avatar
                  className={utils.secCssId(s.worstSec)}
                  style={
                    PREVIEW_SMALL === previewSize ? {
                      width: 30,
                      height: 30,
                      fontSize: '80%',
                    } : null
                  }
                >
                  {s.jumps}
                </Avatar>
              </div>
            )
          }) }
        </div>
      </ListItem>

      { //https://github.com/mui-org/material-ui/blob/92bd073015b9cc0dff3a26195fcb49153ddaab78/docs/src/modules/components/AppDrawerNavItem.js#L71-L83
        //https://github.com/mui-org/material-ui/blob/92bd073015b9cc0dff3a26195fcb49153ddaab78/docs/src/pages/demos/buttons/FlatButtons.js#L40-L42
      }
      { routeButton &&
        <ListItemButtonLink
          href={`http://evemaps.dotlan.net/route/${routeOrigin.name}:${routeDestination.name}`}
          target="_blank"
          content={ <Typography type="body1"> route ({systems.length}) </Typography> }
        />
      }
    </List>
  )
}
