import React from 'react'
import Country from './Country'

const Countries = ({countries, showButtonHandler}) => {
  if (countries.length > 1 && countries.length <= 10) {	
    return (
      <ul>
        {countries.map(country => 
          <Country key={country.alpha2Code} country={country} showButtonHandler={showButtonHandler} />
         )}
      </ul>
    )
  } else if (countries.length > 10) {
	return (
	  <div>
	    Too many matches, specify another filter
	  </div>
    )   
  }
  return null  
}

export default Countries