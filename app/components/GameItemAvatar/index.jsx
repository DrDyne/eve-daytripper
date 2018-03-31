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
  width: 32,
  height: 32,
  padding: 4,
  background: '#ebebeb',
}

export default GameItemAvatar
