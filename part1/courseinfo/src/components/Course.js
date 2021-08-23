import React from 'react'

const Header = ({course}) => {
  return (
	<h1>
	  {course.name}
	</h1>
  )	
}

const Part = ({name, exercises}) => {
  return (
	<p>
	  {name} {exercises}
	</p>
  )  
}	

const Total = ({course}) => {
  return (
	<p>
	  <b>
		Total of {course.parts.reduce((total, part) => total + part.exercises, 0)} exercises
	  </b>	
	</p>
  )	
}

const Course = ({course}) => {
  return (
    <>
	  <Header course={course} />
	  {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
	  <Total course={course}/>
	</>  
  )	
}

export default Course