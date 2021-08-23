import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'
import axios from 'axios'	

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = filter ? persons.filter((person => person.name.toLowerCase().includes(filter.toLowerCase()))) : persons  
  
  const addPerson = (event) => {
	event.preventDefault();
    if (persons.find(person => person.name === newName)) {
	  alert(`${newName} is already added to phonebook`);
	} else {
	  const personObject = {name: newName, phone: newPhone}	  
	  axios
	    .post('http://localhost:3001/persons', personObject)
        .then(response => {
		  setPersons(persons.concat(response.data))
		  setNewName('')
          setNewPhone('') 	  
	    })
		.catch(error => {
			console.log('Error', error)
		})
    }		
  }
  
  const inputHandler = (handler) => {
	return (event) => handler(event.target.value)  
  }	  
  
  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter value={filter} handler={inputHandler(setFilter)} />
	  <h2>Add a new</h2>
      <Form handler={addPerson} name={newName} nameHandler={inputHandler(setNewName)} phone={newPhone} phoneHandler={inputHandler(setNewPhone)} />
      <h2>Numbers</h2>
      <People persons={personsToShow} />
    </div>
  )
}

export default App