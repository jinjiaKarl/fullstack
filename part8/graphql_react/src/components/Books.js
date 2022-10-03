import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'



const Books = (props) => {
  // 当skip为true时，不会执行query
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  })
    const [books, setBooks] = useState([])
    const [filterBooks, setFilterBooks] = useState([])
    const [genre, setGenre] = useState('') // 用于存储当前选中的genre
    const [genres, setGenres] = useState([]) // 用于存储所有的genre

    useEffect(() => {
      if (result.data) {
        setBooks(result.data.allBooks)
        setFilterBooks(result.data.allBooks)
        // 从books中获取所有的genre
        setGenres([...new Set(result.data.allBooks.map((book) => book.genres).flat()), 'All Genres'])
        setGenre('All Genres')
      }
    }, [result.data])
    useEffect(() => {
      if (genre === 'All Genres') {
        setFilterBooks(books)
      } else {
        setFilterBooks(books.filter((book) => book.genres.includes(genre)))
      }
    }, [genre, books])
    if (!props.show) {
      return null
    }
    if (result.loading) {
      return <div>loading...</div>
    }
  
    
    return (
      <div>
        <h2>books</h2>
        <p>in genre <strong>{genre}</strong></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filterBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {genres.length > 0 && 
            genres.map( (g) => {
             return <button key={g} onClick={() => setGenre(g)}>{g}</button>})
            }
        </div>
      </div>
    )
  }
  
  export default Books