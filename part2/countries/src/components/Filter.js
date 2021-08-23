import React from 'react'

const Filter = ({value, handler}) => {	
  return (
	<div>
      find countries <input value={value} onChange={handler} />
	</div>  
  )	
}

export default Filter