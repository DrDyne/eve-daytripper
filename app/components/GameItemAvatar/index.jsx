import React from 'react'

export const GameItemAvatar = ({id, size=32}) => {
  return (<img src={`https://image.eveonline.com/Type/${id}_${size}.png`} />)
}
