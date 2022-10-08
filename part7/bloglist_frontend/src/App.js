import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setAuth } from './reducers/authReducer'
import UserList from './components/UserList'
import {
  Routes, Route,
  useMatch, Link
} from 'react-router-dom'
import User from './components/User'
import { getUsers } from './reducers/userReducer'
import { createNewBlog } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Menu  from './components/Menu'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setAuth(user))
      blogService.setToken(user.token)
    }
  }, [])

  const user = useSelector(state => state.auth)
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  let selectedUser = null
  if (users) {
    selectedUser = match ? users.find(user => user.id === match.params.id) : null
  }
  const blogs = useSelector(state => state.blogs)
  const matchBlog = useMatch('/blogs/:id')
  let selectedBlog = null
  if (blogs) {
    selectedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null
  }

  return (
    <div>
      {user && <Header />}
      <Routes>
        <Route path="/users" element={user ? <UserList /> : (<div>
          <h2>log in to application</h2>
          <Notification  />
          <LoginForm />
        </div>)}/>
        <Route path="/users/:id" element={user ? <User user={selectedUser} /> : (<div>
          <h2>log in to application</h2>
          <Notification  />
          <LoginForm />
        </div>) }/>
        <Route path='/blogs/:id' element={user ? <Blog blog={selectedBlog} user={user}/> : (<div>
          <h2>log in to application</h2>
          <Notification  />
          <LoginForm />
        </div>)} />
        <Route path='/' element= { user ?  <Home /> : (<div>
          <h2>log in to application</h2>
          <Notification  />
          <LoginForm />
        </div>)} />
      </Routes>

    </div>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setAuth(null))
  }
  return (
    <div>
      <Menu /> {user.username} logged in  <button onClick={handleLogout}>log out</button>
      <h2>blog app</h2><Notification />
    </div>
  )
}



const Home = () => {
  const blogs = useSelector(state => state.blogs)
  const copyBlogs = [...blogs]
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      dispatch(createNewBlog(blogObject))
      setAuthor('')
      setTitle('')
      setUrl('')
      dispatch(setNotification({ message: `a new blog ${title} by ${author} added` }, 5))
      blogFormRef.current.toggleVisibility() // 执行ref的toggleVisibility方法
    } catch (error) {
      alert(error)
    }
  }


  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          setAuthor={setAuthor}
          setTitle={setTitle}
          setUrl={setUrl}
        />
      </Togglable>
      {
        copyBlogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (<BlogLink key={blog.id} blog={blog} />))
      }
    </div>
  )
}


const BlogLink = ( { blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`} key={blog.id}> {blog.title} - {blog.author}</Link>
    </div>

  )
}


export default App
