import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'	

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  
  useEffect(() => {
    phonebookService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = filter ? persons.filter((person => person.name.toLowerCase().includes(filter.toLowerCase()))) : persons  
  
  const addPerson = (event) => {
	event.preventDefault();
	const existingContact = persons.find(person => person.name === newName)
    if (existingContact) {
	  if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
		phonebookService.update(existingContact.id, {...existingContact, phone: newPhone})
		  .then(updatedContact => { 
			setPersons(persons.map(person => person.id !== existingContact.id ? person : updatedContact))
			setNewName('')
			setNewPhone('')
			setNotification({text: `Number for ${existingContact.name} changed`, class: 'notification'})
			setTimeout(() => {
			  setNotification(null)
			}, 5000) 
		  })
          .catch(error => {
			setNotification({text: `Information of ${existingContact.name} has already been removed from server`, class: 'error'})
			setTimeout(() => {
			  setNotification(null)
			}, 5000)
			setPersons(persons.filter(person => person.id !== existingContact.id))
			setNewName('')
			setNewPhone('')
		  })		  
	  }	  
	} else {
	  const personObject = {name: newName, phone: newPhone}	  
	  phonebookService.create(personObject)
        .then(newContact => {
		  setPersons(persons.concat(newContact))
		  setNewName('')
          setNewPhone('')
		  setNotification({text: `Added ${newContact.name}`, class: 'notification'})
		  setTimeout(() => {
			setNotification(null)
		  }, 5000)	
	    })
		.catch(error => {
			console.log('Error', error)
		})
    }		
  }
  
  const deleteContact = person => {
	if (window.confirm(`Delete ${person.name}?`)) {
      const id = person.id				
	  phonebookService.deleteContact(id)
	    .then(updatedPersons => {
		  setPersons(persons.filter((p => p.id !== id)))  
	    })
	}	
  }  
  
  const inputHandler = (handler) => {
	return (event) => handler(event.target.value)  
  }	  
  
  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={notification} />
	  <Filter value={filter} handler={inputHandler(setFilter)} />
	  <h2>Add a new</h2>
      <Form handler={addPerson} name={newName} nameHandler={inputHandler(setNewName)} phone={newPhone} phoneHandler={inputHandler(setNewPhone)} />
      <h2>Numbers</h2>
      <People persons={personsToShow} deleteContact={deleteContact} />
    </div>
  )
}

export default App