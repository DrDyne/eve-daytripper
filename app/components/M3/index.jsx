import React from 'react'
export const M3 = ({value}) => {
  if ( !value ) return <div> 0 m3 </div>
  return <div> { value.toLocaleString('en-US') } m3 </div>
}
