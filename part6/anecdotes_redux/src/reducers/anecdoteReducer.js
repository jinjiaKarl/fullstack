import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      voteAction: (state, action) => {
        // action.type: 'anecdotes/voteAction'
        // dispatch(voteAction(111))
        // dispatch({ type: 'anecdoteSlice/voteAction', payload: 1111 })
        const id = action.payload
        const anecdote = state.find(anecdote => anecdote.id === id)
        const changedAnecdote = {
          ...anecdote,
          votes: anecdote.votes + 1
        }
        // 返回的就是最新的state
        return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
      },
      createAction: (state, action) => {
        return [...state, action.payload]
      },
      initAnecdotes: (state, action) => {
        return action.payload
      }
    }
})
  
export const { voteAction, createAction,initAnecdotes } = anecdoteSlice.actions

// npm install redux-thunk
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initAnecdotes(anecdotes))
  }
}
// The principle here is the same: first, an asynchronous operation is executed, 
// after which the action changing the state of the store is dispatched. 
export const createOne = (content) => {
  return async dispatch => {
    const res = await anecdoteService.createNew(content)
    dispatch(createAction(res))
  }
}

export const voteOne = (id) => {
  return async dispatch => {
    const res = await anecdoteService.voteOne(id)
    dispatch(voteAction(res.id))
  }
}
export default anecdoteSlice.reducer