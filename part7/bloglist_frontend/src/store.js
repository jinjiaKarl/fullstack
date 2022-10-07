import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'

// The thunk middleware was automatically added

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    auth: authReducer,
    users: userReducer
  }
})

export default store