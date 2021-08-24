import React from 'react'

const Person = ({ person, deleteContact }) => {
  return (
    <li>
	  {person.name} {person.phone} 
	  <button onClick={() => deleteContact(person)}>delete</button>
	</li>
  )
}

export default Person