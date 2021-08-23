import React from 'react'

const Country = ({ country, showButtonHandler }) => {
  return (
    <li>
	  {country.name}
	  <button onClick={() => showButtonHandler(country)}>show</button>
	</li>
  )
}

export default Country