import anecdoteReducer, {initAnecdotes} from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        messages: messageReducer,
        filters: filterReducer
    }
})

anecdoteService.getAll().then(anecdotes => {
    store.dispatch(initAnecdotes(anecdotes))
}).catch(error => {
    console.log(error)
})

export default store