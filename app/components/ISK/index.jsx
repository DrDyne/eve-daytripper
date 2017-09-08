import React from 'react'

export const shorten = value => {
  const between = (min, max) => ((value > min) && (value < max))
  const [b, m, k] = ['b', 'm', 'k']
  return between(0, 1000)
  ? value
  : between(1000, 1000 * 1000)
  ? Math.round(value / 1000) + k
  : between(1000 * 1000, 1000 * 1000 * 1000)
  ? Math.round(value / (1000 * 1000)) + m
  : Math.round(value / (1000 * 1000 * 1000)) + b
}

window.shorten = shorten
export const ISK = ({value, short}) => {
  if ( !value ) return <div> 0 ISK </div>
  if ( !short ) return <div> { value.toLocaleString('en-US') } ISK </div>
  return <div> { shorten(value) } ISK </div>
}

// 90,352,223,123.99 ISK // !short
// => 90b ISK // short
// => 45m ISK // short
// => 400k ISK // short
