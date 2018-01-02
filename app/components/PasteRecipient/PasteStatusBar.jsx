import React from 'react'
import { LinearProgress } from 'material-ui/Progress'

export const PasteStatusBar = ({step, busy}) => {
  const cssOverride = {
    statusBar: {
      background: 0 === step
      ? 'transparent'
      : 1 === step
      ? 'rgb(245, 0, 87)'
      : 2 === step
      ? 'rgb(245, 0, 87)'
      : 'blue',
      transition: 'background .2s ease-out',
    },
  }

  if ( !!busy ) return (<LinearProgress style={cssOverride.statusBar} mode="query" />)
  if ( 2 === step ) return (<LinearProgress style={cssOverride.statusBar} mode="indeterminate" />)
  return (<LinearProgress style={cssOverride.statusBar} value={0} mode="determinate" />)
}
