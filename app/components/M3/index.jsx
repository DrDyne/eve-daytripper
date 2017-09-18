import React from 'react'
export const M3 = (props) => {
  const { value } = props
  if ( !value ) return <div {...props}> 0 m3 </div>
  return <div {...props}> { value.toLocaleString('en-US') } m3 </div>
}
