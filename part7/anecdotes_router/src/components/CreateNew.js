import { useField } from '../hooks'

const CreateNew = (props) => {
    const contentField = useField('text')
    const authorField = useField('text')
    const infoField = useField('text')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: contentField.value,
        author: authorField.value,
        info: infoField.value,
        votes: 0
      })
    }
    const handleReset = () => {
      contentField.reset()
      authorField.reset()
      infoField.reset()
    }
    // Invalid value for prop `reset` on <input> tag console warning.
    //  <input name='content' {...contentField}/>
    // <input name='author' {...authorField}/>
    // <input name='info' {...infoField}/>
    // how to fix?
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={contentField.value} type={contentField.type} onChange={contentField.onChange}/>
          </div>
          <div>
            author
            <input name='author' value={authorField.value} type={authorField.type} onChange={authorField.onChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={infoField.value} type={infoField.type} onChange={infoField.onChange}/>
          </div>
          <button type='submit'>create</button>
          <button type='reset' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  }
  
export default CreateNew