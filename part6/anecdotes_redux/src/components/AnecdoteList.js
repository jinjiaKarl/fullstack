import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setMessageAction } from '../reducers/messageReducer'


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {
        if (state.filters === 'ALL') {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filters.toLowerCase()))
    })
    // 因为sort()是原地排序，所以需要先复制一份
    const copyAnecdotes = [...anecdotes]
    console.log(anecdotes)
    const dispatch = useDispatch()
    const handleClick = (anecdote) => {
        dispatch(voteAction(anecdote.id))
        dispatch(setMessageAction(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(setMessageAction(''))
        }, 5000)
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