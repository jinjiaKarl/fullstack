import ReactDOM from 'react-dom'
import App from './App'

import {
    ApolloClient,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
  } from '@apollo/client'

  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000',
    }),
})

// ApolloProvider 使得所有的子组件都可以使用useQuery
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)