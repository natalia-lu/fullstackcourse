import React from 'react'
import Person from './Person'

const People = ({persons}) => {
  return (
    <ul>
      {persons.map(person => 
        <Person key={person.name} person={person} />
       )}
    </ul>
  )
}

export default People