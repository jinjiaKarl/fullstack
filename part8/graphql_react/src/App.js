import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {(token) && <button onClick={() => setPage('add')}>add book</button> }
        {(token) && <button onClick={() => setPage('recommend')}>recommend</button>}
        {(token) && <button onClick={logout}>logout</button> }
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} notify={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} notify={notify}/>

      <LoginForm show={page === 'login'} setToken={setToken} notify={notify} setPage={setPage} />

      <Recommended show={page === 'recommend'} />
       
    </div>
  )
}

export default App