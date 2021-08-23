import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ selected, setSelected ] = useState(null)
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
		console.log(response.data)  
        setCountries(response.data)
      })
  }, [])
  
  const filterHandler = (event) => {
	setFilter(event.target.value)
	setSelected(null)	  
  }
  
  const filteredCountries = countries.filter((country => country.name.toLowerCase().includes(filter.toLowerCase())))
  
  const selectedCountry = selected ? selected : (filteredCountries.length === 1 ? filteredCountries[0] : null)
  
  return (
	<div style={{padding: 10}}>
      <Filter value={filter} handler={filterHandler} />
	  <Countries countries={filteredCountries} showButtonHandler={setSelected} />
	  {selectedCountry &&
	  <CountryInfo country={selectedCountry} />
	  }
	</div>  
  );
}

export default App;
