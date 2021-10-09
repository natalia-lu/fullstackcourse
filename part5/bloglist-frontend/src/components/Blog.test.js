import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
	title: 'Test blog',
    author: 'Test author',
    likes: 0,
    url: 'www.google.fi'	
  }

  const user = {
	username: 'newuser',
    name: 'New user',
    token: 'abc' 	
  }

  const mockHandler1 = jest.fn()
  
  const mockHandler2 = jest.fn()
  
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockHandler1} user={user} deleteBlog={mockHandler2} />
    )
  })

  test('title and author are displayed by default, url and number of likes are hidden', () => {
	const element = component.getByText(blog.title + ' ' + blog.author)
    expect(element).toBeVisible()  
	  
    expect(
      component.container.querySelector('.expandable')
    ).toHaveStyle('display: none')
  })

  test('after clicking the button, url and number of likes are visible', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.expandable')
    expect(div).not.toHaveStyle('display: none')
  })
  
  test('if like button is clicked twice, the corresponding event handler is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
	
	fireEvent.click(button)

    expect(mockHandler1.mock.calls).toHaveLength(2)
  })

})