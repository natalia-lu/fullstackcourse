const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0 
  return blogs.reduce((total, blog) => {return total + blog.likes}, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null
  return blogs.reduce((favorite, blog) => {return favorite.likes < blog.likes ? {title: blog.title, author: blog.author, likes: blog.likes} : favorite}, {title: blogs[0].title, author: blogs[0].author, likes: blogs[0].likes})
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return null
  return _(blogs)
		.groupBy('author')
		.map((blogs_by_author, key) => ({
		  author: key,
		  blogs: _.size(blogs_by_author) }))
		.maxBy('blogs') 
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) return null
  return _(blogs)
		.groupBy('author')
		.map((blogs_by_author, key) => ({
		  author: key,
		  likes: _.sumBy(blogs_by_author, 'likes') }))
		.maxBy('likes') 
}	

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}