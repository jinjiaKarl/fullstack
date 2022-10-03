const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/users')
const config = require('./utils/config')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
        return res
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    }, // end of Query
    // 为了解决bookCount的问题，需要定义一个新的resolver
    Author: {
        bookCount: async (root) => {
          const author = await Author.findOne({ name: root.name })
          // Book schema中的author是一个ObjectId
          const books = await Book.find({ author: author.id })
          return books.length
        }
      }, // end of Author
    Mutation: {
      addBook: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError("not authenticated")
        }
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
        //
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new AuthenticationError("not authenticated")
        }
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
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        try{
          const res = await user.save()
          return res
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if (!user || args.password !== '123') {
          throw new UserInputError("wrong credentials")
        }
        const userForToken = {
          username: user.username,
          id: user.id
        }
        return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  }, // end of Mutation
  Subscription: {
    bookAdded: {
      // An AsyncIterator object监听lable为BOOK_ADDED的事件
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
  } // end of resolvers


  module.exports = resolvers
