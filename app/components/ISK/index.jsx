import React from 'react'

export const shorten = value => {
  const between = (min, max) => ((value > min) && (value < max))
  const [b, m, k] = 'bmk'.split('')

  return between(0, 1000)
  ? value
  : between(1000, 1000 * 1000)
  ? Math.round(value / 1000) + k
  : between(1000 * 1000, 1000 * 1000 * 1000)
  ? Math.round(value / (1000 * 1000)) + m
  : Math.round(value / (1000 * 1000 * 1000)) + b
}

export const ISK = (props) => {
  const { value,  short } = props
  if ( !value ) return <span {...props}> 0 ISK </span>
  if ( !short ) return <span {...props}> { value.toLocaleString('en-US') } ISK </span>
  return <span {...props}> { shorten(value) } ISK </span>
}

// 90,352,223,123.99 ISK // !short
// => 90b ISK // short
// => 45m ISK // short
// => 400k ISK // short
