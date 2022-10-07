import { useDispatch } from 'react-redux'
import { deleteBlogById, updateBlogById } from '../reducers/blogReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
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
  }

  return (
    <div >
      <div>
        <h2>{blog.title} {blog.author}{' '} </h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes <button onClick={hanldLikes}>like</button>
        </div>
        <div>added by {user.username}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}
export default Blog
