import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  // 当创建成功之后，再执行一次query，保证cache in sync
  // 下面是第一种方式
  // onError 处理错误
  // const [createBook] = useMutation(CREATE_BOOK, {
  //   refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS}],
  //   onError: (error) => {
  //     console.log(error)
  //     props.notify(error.graphQLErrors[0].message)
  //   }
  // })
  // 第二种方式
  // The callback function is given a reference to the cache and the data returned by the mutation as parameters. 
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ {query: ALL_AUTHORS}],
    onError: (error) => {
      console.log(error)
      props.notify(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
      cache.updateQuery({query: ALL_BOOKS}, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(response.data.addBook)
        }
      })
      // 用下面的会报错 Cache data may be lost when replacing the getAllPosts field of a Query object in Apollo client.
      //updateCache(cache, {query: ALL_BOOKS}, response.data.addBook)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    createBook({ variables: { title, author: {name: author}, published: Number(published), genres } })
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook