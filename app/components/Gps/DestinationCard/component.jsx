import React from 'react'
import { Route } from 'react-router'
import List, { ListItem, ListItemText } from 'material-ui/List'

import { SystemSecAvatar } from 'App/components/SystemSecAvatar'
import ListItemButtonLink from 'App/components/ListItemButtonLink'

const DestinationCard = ({system, routes}) => {
  const disabled = !routes.some(({origin}) => origin.name === system.name) // no route originating from {system}, disables the button
  const SystemHeader = ({onClick, disabled}) => (
    <ListItem
      button={!disabled}
      onClick={!disabled ? onClick : f => f }
      style={{ border: '1px solid #eee' }}
    >
      <ListItemText
        primary={system.name}
        secondary={(
          <span>
            <SystemSecAvatar system={system} />
            { system.wh
            ? system.jClass
            : system.sec.toFixed(2)
            }
          </span>
        )}
        style={{
          textAlign: 'center',
          padding: 0
        }}
      />
    </ListItem>
  )

  const DotlanButton = () => (
    <ListItemButtonLink
      href={`http://evemaps.dotlan.net/system/${system.name}`}
      primary="DOTLAN"
      icon="dotlan"
    />
  )

  const ZkillButton = () => (
    <ListItemButtonLink
      href={`https://zkillboard.com/system/${system.id}/`}
      primary="ZKILL"
      icon="zkill"
    />
  )

  return (
    <List>
      <Route render={({history}) => (
        <SystemHeader
          onClick={() => history.push(`/home/nav/${system.name}`)}
          disabled={disabled}
        />
      )} />
      <DotlanButton />
      <ZkillButton />
    </List>
  )
}

export default DestinationCard
