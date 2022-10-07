import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlogById, updateBlogById } from '../reducers/blogReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const dispatch = useDispatch()
  const hanldLikes = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    dispatch(updateBlogById(blog.id, newBlog))
    // 更新blog后，重新获取blog列表
    dispatch(initializeBlogs())
  }
  const handleRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteBlogById(blog.id))
    // 更新blog后，重新获取blog列表
    dispatch(initializeBlogs())
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
      <div style={hideWhenVisible} className="blogDiv">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="blogFullDiv">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes <button onClick={hanldLikes}>like</button>
        </div>
        <div>{user.username}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
