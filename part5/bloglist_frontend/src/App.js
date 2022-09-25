import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [update])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: 'wrong username or password', type: 'alert' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      const userBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(userBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setNotification({ message: `a new blog ${title} by ${author} added` })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogFormRef.current.toggleVisibility() // 执行ref的toggleVisibility方法
    }catch(error) {
      alert(error)
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification}/>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} user={user} setUpdate={setUpdate}/>
        )}
    </div>
  )
}

export default App