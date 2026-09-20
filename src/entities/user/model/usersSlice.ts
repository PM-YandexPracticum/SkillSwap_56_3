import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { UsersState } from './types'
import type { UserCard, UsersResponse } from '@/shared/types'
import { fetchUsers, fetchUserById } from '@/api/users'

const initialState: UsersState = {
  meta: null,
  users: [],
  likedUserIds: [],
  currentUser: null,
  isLoading: false,
  isLoadingCurrent: false,
  error: null,
  errorCurrent: null,
}

export const loadUsers = createAsyncThunk<UsersResponse>(
  'users/loadUsers',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return await fetchUsers()
  }
)

export const loadUserById = createAsyncThunk<UserCard, string>(
  'users/loadUserById',
  async (id, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const user = await fetchUserById(id)
    if (!user) return rejectWithValue(`Пользователь ${id} не найден`)
    return user
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleLike(state, action: { payload: string }) {
      const userId = action.payload
      const user = state.users.find((u) => u.id === userId)
      if (!user) return

      const alreadyLiked = state.likedUserIds.includes(userId)

      if (alreadyLiked) {
        state.likedUserIds = state.likedUserIds.filter((id) => id !== userId)
        user.likesCount -= 1
      } else {
        state.likedUserIds.push(userId)
        user.likesCount += 1
      }
    },

    clearCurrentUser(state) {
      state.currentUser = null
      state.errorCurrent = null
      state.isLoadingCurrent = false
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── loadUsers ──────────────────────────────────────
      .addCase(loadUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.meta = action.payload.meta
        state.users = action.payload.data
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          action instanceof Error
            ? action.message
            : 'Не удалось загрузить пользователей'
      })

      // ─── loadUserById ───────────────────────────────────
      .addCase(loadUserById.pending, (state) => {
        state.isLoadingCurrent = true
        state.errorCurrent = null
      })
      .addCase(loadUserById.fulfilled, (state, action) => {
        state.isLoadingCurrent = false
        state.currentUser = action.payload
      })
      .addCase(loadUserById.rejected, (state, action) => {
        state.isLoadingCurrent = false
        state.errorCurrent =
          action instanceof Error
            ? action.message
            : 'Не удалось загрузить пользователя'
      })
  },
})

export const { toggleLike, clearCurrentUser } = usersSlice.actions
export default usersSlice.reducer