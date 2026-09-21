import { createSlice } from '@reduxjs/toolkit'
import { loadUsers } from './usersThunks'
import type { UsersState } from './types'

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
        // state.users НЕ трогаем — старые данные сохраняются
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
        state.error = null
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? action.error.message ?? 'Неизвестная ошибка'
        // state.users НЕ трогаем — старые данные сохраняются
      })
  },
})

export default usersSlice.reducer