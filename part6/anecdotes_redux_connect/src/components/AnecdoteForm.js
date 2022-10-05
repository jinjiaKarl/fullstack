import { createOne } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // this createOne function includes the dispatch
        props.createOne(content)
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


const mapDispatchToProps = {
  createOne,
}
// 等价上面的写法
// const mapDispatchToProps = (dispatch) => {
//   return {
//     createOne: (content) => {
//       dispatch(createOne(content))
//     }
//   }
// }

export default connect(null, mapDispatchToProps)(AnecdoteForm)
