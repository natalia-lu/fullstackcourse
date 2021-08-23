import React from 'react'
import CountryInfo from './CountryInfo'
import Countries from './Countries'

const Display = ({countries, selected, showButtonHandler}) => {
  if (countries.length === 1) {
	return <CountryInfo country={countries[0]} />
  } else if (countries.length > 1 && countries.length <= 10) {  
	return (
	  <>	
	    <Countries countries={countries} showButtonHandler={showButtonHandler}/>
	    <CountryInfo country={selected} />
	  </>	
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

export default Display