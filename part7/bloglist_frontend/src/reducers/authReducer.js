import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUserAction: (state, action) => {
      return action.payload
    }
  }
})

export const { setUserAction } = authSlice.actions


export const setAuth = (user) => {
  return async dispatch => {
    dispatch(setUserAction(user))
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUserAction(user))
    } catch (error) {
      dispatch(setNotification({ message: 'wrong username or password', type: 'alert' }, 5))
    }
  }
}

export default authSlice.reducer