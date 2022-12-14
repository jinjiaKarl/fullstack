import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, setUpdate }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hanldLikes = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, newBlog)
    setUpdate(Math.floor(Math.random() * 100))
  }
  const handleRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    await blogService.deleteBlog(blog.id)
    setUpdate(Math.floor(Math.random() * 100))
    toggleVisibility()
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blogDiv'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blogFullDiv'>
        {blog.title} {blog.author}  <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={hanldLikes}>like</button></div>
        <div>{user.username}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setUpdate: PropTypes.func.isRequired
}

export default Blog