const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config= require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const book = require('./models/book')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

// 定义schema
const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]! 
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  input AuthorInput {
    name: String!
    born: Int
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int
    ): Author
  }
`
// 定义resolver
// 对Book和Author没有定义resolver，会生成一个默认的resolver
//  The object itself can be accessed through the first parameter of the resolver, root.
const resolvers = {
  Query: {
    bookCount: async() => await Book.countDocuments({}),
    authorCount: async() => await Author.countDocuments({}),
    allBooks: async (root, args) => {

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          if (args.genre) {
            return await Book.find({ genres: { $in: [args.genre] }, author: author.id }).populate('author')
          }
          return await Book.find({ author: author.id }).populate('author')
        }
        return null
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const res = await Author.find({})
      console.log(res)
      return res
    }
  },
  // 为了解决bookCount的问题，需要定义一个新的resolver
  Author: {
      bookCount: async (root) => {
        const author = await Author.findOne({ name: root.name })
        // Book schema中的author是一个ObjectId
        const books = await Book.find({ author: author.id })
        return books.length
      }
    },
  Mutation: {
    addBook: async (root, args) => {
      const foundBook = await Book.findOne({ title: args.title })
      if (foundBook) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }
      let foundAuthor = await Author.findOne({ name: args.author.name })
      if (!foundAuthor) {
         // 需要把author添加到数据库中
        const author = new Author({ ...args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      foundAuthor = await Author.findOne({ name: args.author.name })
      const book = new Book({ ...args, author: foundAuthor })
      try {
        await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.title,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name })
      if (!foundAuthor) {
        return null
      }
      if (!args.setBornTo) {
        return null
      }
      // The better way is to use $set
     const updateAuthor = { name: args.name, born: args.setBornTo }
      try {
        return await Author.findByIdAndUpdate(foundAuthor.id, updateAuthor, { new: true })
      }catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.title,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({port: 4000}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})