import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
      ) {
        title
        author
        published
        genres
        }
      }`

export const SET_BIRTHDAY = gql`
      mutation setBirthday($name: String!, $setBornTo: Int!) {
        editAuthor(
          name: $name,
          setBornTo: $setBornTo
        ){
          name
          born
        }
      }
`

// 带有变量的query要有名称
export const ALL_BOOKS = gql`
query filterBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    title
    author
    published
  }
}`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}`


