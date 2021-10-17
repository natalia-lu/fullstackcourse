import React from 'react'
import CommentsForm from './CommentsForm'
import { Button } from 'react-bootstrap'
const Blog = ({ blog, updateBlog, user, deleteBlog, addComments }) => {
  if (!blog) {
    return null
  }
  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <Button size='sm' onClick={() => updateBlog({ ...blog, likes: blog.likes + 1 })}>like</Button>
      </div>
      <div>{blog.user ? 'added by '+blog.user.name : ''}</div>
      <div><b>comments</b></div>
      <CommentsForm addComments={addComments}/>
      {blog.comments &&
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      }
      {user && blog.user && user.username === blog.user.username && <div><Button size='sm' onClick={() => deleteBlog(blog)}>remove</Button></div>}
    </div>
  )
}

export default Blog