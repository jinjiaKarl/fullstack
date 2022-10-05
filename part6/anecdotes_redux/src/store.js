import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

// The thunk middleware was automatically added


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        messages: messageReducer,
        filters: filterReducer
    }
})

export default store