import React from 'react'
import { Route } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { SystemSecAvatar, SystemSecAvatarBig } from '../SystemSecAvatar'

export const identifyConnection = (jSystem, { sig, leadsTo }) => {
  // use jSystem's jumped connections to return identified system name instead, if found
  return leadsToFulltext({ sig, leadsTo })
}

export const leadsToFulltext = ({leadsTo}) => {
  const kClass = {
    HS: 'High-Sec',
    LS: 'Low-Sec',
    NS: 'Null-Sec',
  }[leadsTo]
  const [ jClassNumber ] = leadsTo.match(/\d+/) || []

  return kClass || (jClassNumber
  ? `Class ${jClassNumber}`
  : leadsTo) //Thera
}

export const WormholeHistoryListItems = props => {
  const { jSpace } = props

  const categories = jSpace.reduce((memo, {jClass}) => (
    memo.find(c => c === jClass)
    ? memo
    : memo.concat(jClass)
  ), [])

  const wormholesByClass = categories.reduce((memo, jClass) => {
    memo[jClass] = jSpace.filter(system => jClass === system.jClass)
    return memo
  }, {})
  console.log(wormholesByClass)

  const { C1, C2, C3, C4, C5, C6 } = wormholesByClass
  const { C13, Thera } = wormholesByClass

  return (
    <div>
      { [ C6, C5, C4, C3, C2, C1, C13, Thera ]
        .filter(systems => !!systems)
        .map(systems => {
          const { jClass } = systems[0]
          return (
            <div key={'category-group-'+jClass}>
              <JSpaceSubHeader jClass={jClass} />
              <JSpaceNavigation {...props} systems={systems} />
            </div>
          )
        })
      }
    </div>
  )
}

export const JSpaceSubHeader = ({jClass}) => {
  return (<ListSubheader
    style={{
      textAlign: 'right'
    }} >
    { leadsToFulltext({leadsTo: jClass}) }
  </ListSubheader>)
}

export const JSpaceNavigation = props => {
  const { systems, background } = props
  return (
    <div style={{background}}>
      { systems.map(j => {
        return (
          <Route key={`route-history-wormhole-${j.id}`} render={({history}) => (
            <div>
              <ListItem
                button
                style={{
                  textDecoration: 'none'
                }}
                onClick={() => history.push(`/home/nav/${j.name}`)}
              >

                <SystemSecAvatarBig system={{sec: -1}} label={j.jClass}/>
                <ListItemText
                  primary={j.name}
                  secondary={j.effectName}
                />
              </ListItem>

              { j.statics &&
                j.statics
                .sort((a, b) => a.sig.localeCompare(b.sig))
                .map(wh => (
                <Route key={`${j.name}:${wh.sig}`} render={({history}) => (
                  <WormholeStaticListItem
                    system={j}
                    sig={wh.sig}
                    leadsTo={wh.leadsTo}
                    onClick={() => {
                      history.push(`/home/nav/${j.name}/${wh.sig}`)
                    }}
                  />
                )} />
              )) }
            </div>
          )} />
        )
      }) }
    </div>
  )
}

export default WormholeHistoryListItems

export const WormholeStaticListItem = ({ system, sig, leadsTo, onClick }) => (
  <ListItem
    button
    dense
    onClick={onClick}
  >
    <Avatar style={{
      width:30,
      height: 30,
      marginLeft: 10,
      fontSize: '80%'
    }}>
      {leadsTo}
    </Avatar>
    <ListItemText
      primary={identifyConnection(system, { sig, leadsTo })}
      secondary={sig}
    />
  </ListItem>
)
