import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  const voteHandler = (anecdote) => {
	return () => {  
	  props.voteForAnecdote(anecdote)
	  props.setNotification(`you voted '${anecdote.content}'`, 5, props.timer)
	}  
  }  
 
  return (
    <ul>
	  {props.anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={voteHandler(anecdote)}/>)}
    </ul>
  ) 	
}

const mapStateToProps = (state) => {
  return {
	anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes-a.votes),
	timer: state.notification.timer
  }
}

export default connect(
  mapStateToProps,
  { voteForAnecdote, setNotification }
)(AnecdoteList)

