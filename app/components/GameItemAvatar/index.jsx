import React from 'react'

const GameItemAvatar = props => {
  const { id, size, style } = props

  return (
    <img
      src={`https://image.eveonline.com/Type/${id}_${size}.png`}
      style={style}
    />
  )
}

GameItemAvatar.defaultProps = {
  size: 64,
  style: {
    width: 32,
    height: 32,
    padding: 4,
    background: '#ebebeb',
  }
}

export default GameItemAvatar
