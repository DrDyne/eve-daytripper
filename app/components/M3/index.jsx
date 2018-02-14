import React from 'react'
export const M3 = (props) => {
  const { value } = props
  if ( !value ) return <span {...props}> 0 m3 </span>
  return <span {...props}> { value.toLocaleString('en-US') } m3 </span>
}
