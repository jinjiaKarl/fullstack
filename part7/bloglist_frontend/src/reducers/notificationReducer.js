import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'messages',
  initialState: null,
  reducers: {
    setNotificationAction: (state, action) => {
      return action.payload
    },
  }
})

export const { setNotificationAction } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNotificationAction(message))
    setTimeout(() => {
      dispatch(setNotificationAction(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer