import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
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
      setNotification({message: 'wrong username or password', type: 'alert'})
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
      setNotification({message: `a new blog ${title} by ${author} added`})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }catch(error) {
      alert(error)
    }
   
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification}/>
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input type="text" name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input type="text" name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App