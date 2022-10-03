const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const mongoose = require('mongoose')
const config= require('./utils/config')
const User = require('./models/users')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

console.log('connecting to', config.MONGODB_URI)
// n Mongo, the identifying field of an object is called _id
// and we previously had to parse the name of the field to id ourselves. 
// Now GraphQL can do this automatically.
mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // for subscription
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe 
    },
    {
      server: httpServer,
      path: '',
    }
  )
 
  // The object returned by context is given to all resolvers as their third parameter. 
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), config.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return {currentUser}
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                subscriptionServer.close()
              },
            }
          }
        }    
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()