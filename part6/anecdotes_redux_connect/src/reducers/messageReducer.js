import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'messages',
    initialState: null,
    reducers: {
      setMessageAction: (state, action) => {
        return action.payload.message
      },
    }
})
  
export const { setMessageAction} = messageSlice.actions

export const setMessage = (message, time) => {
    return async dispatch => {
      if (message.timeOutId) {
        // 如果有之前的定时器，就取消之前的定时器
        clearTimeout(message.timeOutId)
      }
      const timeOutId = setTimeout(() => {
        dispatch(setMessageAction({ message: null, timeOutId: null }))
      }, time * 1000)
      dispatch(setMessageAction({ message: message.message, timeOutId: timeOutId }))      
    }
}

export default messageSlice.reducer