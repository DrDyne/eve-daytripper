import React from 'react'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'

export const identifyConnection = (jSystem, whStatic) => {
  // use jSystem's jumped connections to return identified system name instead, if found
  return leadsToFulltext(whStatic)
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

export const JSpaceSubHeader = ({jClass}) => {
  return (<ListSubheader
    style={{
      textAlign: 'right'
    }} >
    { leadsToFulltext({leadsTo: jClass}) }
  </ListSubheader>)
}
