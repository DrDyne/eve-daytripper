import React from 'react'

const GameItemAvatar = props => {
  const { id, size, width, height, padding, background } = props

  return (
    <img
      src={`https://image.eveonline.com/Type/${id}_${size}.png`}
      style={{ width, height, padding, background }}
    />
  )
}

GameItemAvatar.defaultProps = {
  size: 64,
  //big icons
  //width: 48,
  //height: 48,
  //small icons
  width: 36,
  height: 36,
  padding: 1,
  background: 'white',
}

export default GameItemAvatar
