import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog: (state, action) => {
      return [...state, action.payload]
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload)
    },
    updateBlog: (state, action) => {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    },
    initBlogs: (state, action) => {
      return action.payload
    }
  }
})

export const { initBlogs, createBlog, deleteBlog, updateBlog } = blogSlice.actions


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(initBlogs(blogs))
  }
}

export const createNewBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
  }
}

export const deleteBlogById = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const updateBlogById = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer