import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BornYearForm from './BornYearForm'


const Authors = (props) => {
    // 当skip为true时，不会执行query
  const result = useQuery(ALL_AUTHORS,{
    skip: !props.show,
  })

    if (!props.show) {
      return null
    }

    if (result.loading)  {
      return <div>loading...</div>
    }
    
    const authors = result.data.allAuthors
  
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BornYearForm authors={authors} notify={props.notify}/>
      </div>
    )
  }
  
  export default Authors