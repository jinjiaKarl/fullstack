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
export default messageSlice.reducer