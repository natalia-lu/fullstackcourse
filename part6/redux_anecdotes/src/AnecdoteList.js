import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from './reducers/anecdoteReducer'
import { setNotification, resetNotification } from './reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {	
  return (
    <li>
	  <div>{anecdote.content}</div>
	  <div>has {anecdote.votes}
		<button onClick={handleClick}>vote</button>
      </div>
	</li>  
  )	
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const voteHandler = (anecdote) => {
	return () => {  
	  dispatch(voteForAnecdote(anecdote.id))
	  dispatch(setNotification(`you voted '${anecdote.content}'`))
	  setTimeout(() => dispatch(resetNotification()), 5000)
	}  
  }  
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes-a.votes))
 
  return (
    <ul>
	  {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={voteHandler(anecdote)}/>)}
    </ul>
  ) 	
}

export default AnecdoteList

