const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return state.map(b => b.id === action.data.id ? action.data : b)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export const createBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data: blog,
  }
}

export const modifyBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog,
  }
}

export const removeBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: {
      id
    }
  }
}

export default blogReducer