import React from 'react'
import {
  LinearProgress
} from 'material-ui'

export const FillGauge = ({qty, target}) => {
  const progress = ( qty / target ) * 100
  const style = {
    width: 72,
    height: 1,
  }

  return (<LinearProgress
    value={progress}
    mode="determinate"
    style={style}/>)
}
