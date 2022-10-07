import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

// The thunk middleware was automatically added

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  }
})

export default store