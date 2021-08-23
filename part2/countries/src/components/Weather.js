import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}&units=m`
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
		console.log(response.data)  
        setWeather(response.data)
      })
  }, [url])
  if (weather.current) {
	return (  
	  <div>
		<h2>Weather in {city}</h2>	
		<div><b>temperature:</b> {weather.current.temperature} Celcius</div>
		{weather.current.weather_icons[0] &&
		  <img src={weather.current.weather_icons[0]} alt="weather_icon" width="60" />
		}
		<div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
	  </div>
    )	  
  }	  
  return null
}

export default Weather
