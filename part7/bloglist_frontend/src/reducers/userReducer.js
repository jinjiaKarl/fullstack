import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUsersAction: (state, action) => {
      return action.payload
    }
  }
})

export const { setUsersAction } = userSlice.actions


export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsersAction(users))
  }
}

export default userSlice.reducer