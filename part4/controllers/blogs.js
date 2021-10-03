const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
	const blogs = await Blog.find({}).populate('user', {'username': 1, 'name': 1})
	response.json(blogs.map(blog => blog.toJSON()))  
  } catch(exception) {
    next(exception)
  }  
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
	
	if (!body.title && !body.url) {
	  return response.status(400).json({ error: 'Title and URL should not be blank' })
	}
	
	if (!request.token || !request.user) {
	  return response.status(401).json({ error: 'token missing or invalid' })
	}
	
	const user = await User.findById(request.user)
	
	const blog = new Blog({
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes ? body.likes : 0,
	  user: user._id
	})  
	
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog.toJSON())
  }	catch(exception) {
	next(exception)  
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
	const user = request.user 
    const blog = await Blog.findById(request.params.id)
    if (!user || blog.user.toString() !== user.toString()) {
	  return response.status(401).json({ error: 'unauthorised user' })	
	}	
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
	next(exception)  
  }	
})

blogsRouter.put('/:id', async(request, response, next) => {
  try {	
	const body = request.body
	let blog = {}
	if (body.title) {
	  blog.title = body.title  
	}
	if (body.author) {
	  blog.author = body.author  
	}
	if (body.url) {
	  blog.url = body.url  
	}
	if (body.likes) {
	  blog.likes = body.likes  
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }	
})

module.exports = blogsRouter