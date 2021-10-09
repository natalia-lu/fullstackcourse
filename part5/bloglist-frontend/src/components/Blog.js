import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const visibilityStyle = { display: expanded ? '' : 'none' }

  const toggleVisibility = () => {
    setExpanded(!expanded)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{expanded ? 'hide' : 'view'}</button>
      <div style={visibilityStyle} className='expandable'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => updateBlog({ ...blog, likes: blog.likes + 1 })}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        {user && blog.user && user.username === blog.user.username && <div><button onClick={() => deleteBlog(blog)}>remove</button></div>}
      </div>
    </div>
  )
}

export default Blog