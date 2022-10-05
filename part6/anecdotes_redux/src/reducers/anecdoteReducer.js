import { createSlice } from '@reduxjs/toolkit'


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
export default anecdoteSlice.reducer