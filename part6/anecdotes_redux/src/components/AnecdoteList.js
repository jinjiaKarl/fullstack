import { useSelector, useDispatch } from 'react-redux'
import { voteOne } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/messageReducer'


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {
        if (state.filters === 'ALL') {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filters.toLowerCase()))
    })
    // 因为sort()是原地排序，所以需要先复制一份
    const copyAnecdotes = [...anecdotes]
    const dispatch = useDispatch()
    const handleClick = (anecdote) => {
        dispatch(voteOne(anecdote.id))
        dispatch(setMessage(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {copyAnecdotes.sort((b1, b2) => { return b2.votes - b1.votes}).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() =>  handleClick(anecdote) }>vote</button>
            </div>
            </div>
      )}
        </div> 
    )
}

export default AnecdoteList