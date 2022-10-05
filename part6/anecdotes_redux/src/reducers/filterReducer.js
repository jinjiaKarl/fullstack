import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filters',
    initialState: 'ALL',
    reducers: {
      setFilterAction: (state, action) => {
        return action.payload
      },
    }
})
  
export const { setFilterAction} = filterSlice.actions
export default filterSlice.reducer