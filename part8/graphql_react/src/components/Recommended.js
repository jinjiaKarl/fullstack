import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
  const user = useQuery(ME) // render component时自动执行query
  const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS) // 后续手动调用query
  const [favoriteBooks, setFavoriteBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setFavoriteBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (user.data && user.data.me) {
      getFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } })
    }
  }, [user.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <p>
        books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended