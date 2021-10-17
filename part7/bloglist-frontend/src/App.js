import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route, Link, Redirect, useRouteMatch, useHistory
} from 'react-router-dom'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import { showSuccessNotification, showWarning, hideNotification } from './reducers/notificationReducer'
import { createBlog, modifyBlog, removeBlog, initializeBlogs } from './reducers/blogReducer'
import { setUser, resetUser } from './reducers/userReducer'
import userService from './services/users'
import { Table, Button, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const [users, setUsers] = useState([])

  const user = useSelector(state => state.user)

  const { message, variant } = useSelector(state => state.notification)

  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [blogs])

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
      dispatch(createBlog(savedBlog))
      //setBlogs(blogs.concat(savedBlog))
      dispatch(showSuccessNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    } catch (exception) {
      dispatch(showWarning('Error creating new blog'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch(modifyBlog(updatedBlog))
    } catch (exception) {
      dispatch(showWarning('Error updating blog'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  }

  const addComments = async (id, comments) => {
    try {
      const updatedBlog = await blogService.addComments(id, comments)
      dispatch(modifyBlog(updatedBlog))
    } catch (exception) {
      dispatch(showWarning('Error adding comments'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        history.push('/blogs')
        dispatch(removeBlog(blog.id))
      } catch (exception) {
        dispatch(showWarning('Error deleting blog'))
        setTimeout(() => {
          dispatch(hideNotification())
        }, 5000)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(resetUser())
    blogService.setToken(null)
  }

  if (user === null) {
    return (
      <div className='container'>
        <h2>Log in to application</h2>
        <Notification message={message} variant={variant} />
        <Login setToken={blogService.setToken} />
      </div>
    )
  }

  const padding = { padding: 5 }

  return (
    <div className='container'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <span style={{ paddingLeft: 5 }}>{user.name} logged in
                <Button size='sm' onClick={handleLogout}>Logout</Button>
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h2>blogs</h2>
      <Notification message={message} variant={variant} />

      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={matchedBlog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} addComments={(comments) => addComments(matchedBlog.id, comments)} />
        </Route>
        <Route path="/blogs">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <Table striped>
            <tbody>
              {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <tr key={blog.id}>
                  <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></td>
                </tr>
              )}
            </tbody>
		  </Table>
        </Route>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Redirect to="/blogs" />
        </Route>
      </Switch>

    </div>
  )
}

export default App