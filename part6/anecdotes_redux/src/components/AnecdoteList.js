import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voteAction(id))
      }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((b1, b2) => b2.votes - b1.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
      )}
        </div> 
    )
}

export default AnecdoteList