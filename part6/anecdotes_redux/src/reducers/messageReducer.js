import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'messages',
    initialState: '',
    reducers: {
      setMessageAction: (state, action) => {
        return action.payload
      },
    }
})
  
export const { setMessageAction} = messageSlice.actions

export const setMessage = (message, time) => {
    return async dispatch => {
      dispatch(setMessageAction(message))
      setTimeout(() => {
          dispatch(setMessageAction(''))
      }, time * 1000)
    }
}

export default messageSlice.reducer