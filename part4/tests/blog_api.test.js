const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')

beforeAll(async () => {
  const users = await helper.usersInDb()
  const username = 'test'
  if (!users.find(u => u.username === username)) {
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username, passwordHash })
	await user.save()
  }	
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()  
})

test('a valid blog can be added ', async () => {
  const userData = await api.post('/api/login')
                            .send({username: 'test', password: 'secret'})

  expect(userData.body.token).toBeDefined()  
  
  const newBlog = {
    title: 'blog is created if valid authorization token is sent',
    author: 'Test Test',
	url: 'www.google.fi',
	likes: 3
  }
	
  await api
    .post('/api/blogs')
    .send(newBlog)
	.set({ Authorization: 'bearer '+ userData.body.token})
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(newBlog.title)
})

test('a blog without authorization token not added ', async () => {  
  
  const newBlog = {
    title: 'this blog should not be added',
    author: 'Test Test',
	url: 'www.google.fi',
	likes: 3
  }
	
  const response = await api
		                   .post('/api/blogs')
                           .send(newBlog)
                           .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  expect(response.body.error).toBe('token missing or invalid')
})

test('if likes property is missing, the blog is saved with default likes = 0', async () => {
  const userData = await api.post('/api/login')
                            .send({username: 'test', password: 'secret'})

  expect(userData.body.token).toBeDefined()
  
  const newBlog = {
    title: 'if likes property is missing, it defaults to 0',
    author: 'Test Test',
	url: 'www.google.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
	.set({ Authorization: 'bearer '+ userData.body.token})
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const savedBlog = blogsAtEnd.find(b => b.title === newBlog.title)
  expect(savedBlog.likes).toBe(0)
})

test('if title and url properties are missing, the server responds with HTTP 400', async () => {
  //const blogsAtStart = await helper.blogsInDb()	
  const newBlog = {
    author: 'Test Test',
	likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  //const blogsAtEnd = await helper.blogsInDb()
  //expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
})

test('test deletion, succeeds with status code 204 if id is valid', async () => {
	const userData = await api.post('/api/login')
                              .send({username: 'test', password: 'secret'})

	expect(userData.body.token).toBeDefined()
	
	const newBlog = {
	  title: 'blog is created if valid authorization token is sent',
      author: 'Test Test',
	  url: 'www.google.fi',
	  likes: 3
    }
	
	await api
      .post('/api/blogs')
      .send(newBlog)
	  .set({ Authorization: 'bearer '+ userData.body.token})
      .expect(201)
	
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
	  .set({ Authorization: 'bearer '+ userData.body.token})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('test update number of likes for existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart[0]
	const likesAtStart = blogToUpdate.likes
	blogToUpdate.likes = likesAtStart + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length
    )

    const updatedBlog = blogsAtEnd.find(b => b.title === blogToUpdate.title)

    expect(updatedBlog.likes).toBe(likesAtStart + 1)
})

afterAll(() => {
  mongoose.connection.close()
})