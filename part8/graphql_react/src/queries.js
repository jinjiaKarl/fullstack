import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
      ) {
        title
        author {
          name
        }
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
// 注意返回值里有结构体时，要用花括号括起来写对应的字段名
export const ALL_BOOKS = gql`
query filterBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    title
    author {
      name
    }
    published
    genres
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

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}`
