import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'

const AnecdoteForm = (anecdote) => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
	event.preventDefault()  
	const anecdote = event.target.anecdote.value
	event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`you created '${anecdote}'`, 10))
  }	  
  return (
    <form onSubmit={addAnecdote}>
	  <h2>create new</h2>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
  )	
}

export default AnecdoteForm	