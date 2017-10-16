import React from 'react'

export const GameItemAvatar = props => {
  const { id, size=32 } = props
  return (<img src={`https://image.eveonline.com/Type/${id}_${size}.png`} {...props}/>)
}
