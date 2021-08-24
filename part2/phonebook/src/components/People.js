import React from 'react'
import Person from './Person'

const People = ({persons, deleteContact}) => {
  return (
    <ul>
      {persons.map(person => 
        <Person key={person.name} person={person} deleteContact={deleteContact} />
       )}
    </ul>
  )
}

export default People