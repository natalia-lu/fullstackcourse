import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (event) => {
	event.preventDefault()  
	const anecdote = event.target.anecdote.value
	event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`you created '${anecdote}'`, 5, props.timer)
  }	  
  return (
    <form onSubmit={addAnecdote}>
	  <h2>create new</h2>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
  )	
}

const mapStateToProps = (state) => {
  return {
	timer: state.notification.timer
  }
}

export default connect(
  mapStateToProps,
  { createAnecdote, setNotification }
)(AnecdoteForm)	