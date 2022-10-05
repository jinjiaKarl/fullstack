import AnecdoteForm  from "./components/AnecdoteForm"
import AnecdoteList  from "./components/AnecdoteList"
import Notification  from "./components/Notification"
import Filter  from "./components/Filter"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import {initAnecdotes} from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect( () => {
    async function init() {
      const anecdotes = await anecdoteService.getAll()
      dispatch(initAnecdotes(anecdotes))
    }
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
     <AnecdoteList />
     <AnecdoteForm />
    </div>
  )
}

export default App