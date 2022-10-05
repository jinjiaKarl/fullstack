import { useDispatch } from 'react-redux'
import {  createAction } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const res = await anecdoteService.createNew(content)
        dispatch(createAction(res))
      }

    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={handleSubmit}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
          </form>
        </div>
    )
}

export default AnecdoteForm