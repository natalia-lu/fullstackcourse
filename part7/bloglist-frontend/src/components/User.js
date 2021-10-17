import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User