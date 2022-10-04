import { useDispatch } from 'react-redux'
import {  createAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAction(content))
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