import { connect } from 'react-redux'
import { voteOne } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/messageReducer'


const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const timeOutId = props.messages ? props.messages.timeOutId : null
    // 因为sort()是原地排序，所以需要先复制一份
    const copyAnecdotes = [...anecdotes]
    const handleClick = (anecdote) => {
        // 拿到之前setTimeOut的id，如果有的话，就取消之前的定时器
        props.voteOne(anecdote.id)
        props.setMessage({message: `you voted '${anecdote.content}'`, timeOutId: timeOutId }, 5)
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


const mapStateToProps = (state) => {
    if (state.filters === 'ALL') {
        return {
            anecdotes: state.anecdotes,
            messages: state.messages
        }
    }
    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filters)),
        messages: state.messages
    }
}

const mapDispatchToProps = {
    voteOne,
    setMessage
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)