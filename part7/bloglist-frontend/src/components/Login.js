import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { showWarning, hideNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setToken(user.token)
      dispatch(setUser(user))
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      dispatch(showWarning('wrong username or password'))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" size="sm" type="submit">login</Button>
      </Form.Group>
    </Form>
  )
}

export default Login