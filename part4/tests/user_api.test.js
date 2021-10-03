const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('secrett', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'nlukicheva',
      name: 'Natalia Lukicheva',
      password: 'passw0rd',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('username and password validated correctly', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  
  test('user with 2 characters password discarded', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'Test User',
      password: 'pa',
    }

    const response = await api
							.post('/api/users')
							.send(newUser)
							.expect(400)
							.expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body.error).toBe('Password should be at least 3 characters long.')
  })
  
  test('user with 3 characters username and 3 characters password saved to the db', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'Test User',
      password: 'pas',
    }

    const response = await api
							.post('/api/users')
							.send(newUser)
							.expect(200)
							.expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('user with 2 characters username discarded', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'Test User',
      password: 'passw0rd',
    }

    const response = await api
							.post('/api/users')
							.send(newUser)
							.expect(400)
							.expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})