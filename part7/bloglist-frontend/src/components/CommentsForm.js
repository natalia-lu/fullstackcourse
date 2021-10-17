import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const CommentsForm = ({ addComments }) => {
  const [comments, setComments] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addComments({
      comments
    })
    setComments('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={comments}
        onChange={({ target }) => setComments(target.value)}
      />
      <Button size='sm' type="submit">add comment</Button>
    </form>
  )
}

export default CommentsForm