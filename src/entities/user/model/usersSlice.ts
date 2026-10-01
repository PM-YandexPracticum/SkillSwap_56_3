import { createSlice } from '@reduxjs/toolkit'
import { loadUsers, loadUserById } from './usersThunks'
import type { UsersState } from './types'
import { addFavoriteId, removeFavoriteId, getFavoritesIds, hasFavoriteId } from './toggleLikeUtils'

const initialState: UsersState = {
  meta: null,
  users: [],
  likedUserIds: getFavoritesIds(),
  currentUser: null,
  isLoading: false,
  isLoadingCurrent: false,
  error: null,
  errorCurrent: null,
}

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
        removeFavoriteId(userId)
        user.likesCount -= 1
      } else {
        state.likedUserIds.push(userId)
        addFavoriteId(userId)
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
        // state.users НЕ трогаем — старые данные сохраняются
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.meta = action.payload.meta
        state.users = action.payload.data.map((user) =>
          hasFavoriteId(user.id)
            ? { ...user, likesCount: user.likesCount + 1 }
            : user
        )
        state.error = null
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error =
          action.payload ?? action.error.message ?? 'Неизвестная ошибка'
        // state.users НЕ трогаем — старые данные сохраняются
      })

      // ─── loadUserById ───────────────────────────────────
      .addCase(loadUserById.pending, (state) => {
        state.isLoadingCurrent = true
        state.errorCurrent = null
        // state.currentUser НЕ трогаем — старые данные сохраняются
      })
      .addCase(loadUserById.fulfilled, (state, action) => {
        state.isLoadingCurrent = false
        state.currentUser = action.payload
        state.errorCurrent = null
      })
      .addCase(loadUserById.rejected, (state, action) => {
        state.isLoadingCurrent = false
        state.errorCurrent =
          action.payload ?? action.error.message ?? 'Неизвестная ошибка'
        // state.currentUser НЕ трогаем — старые данные сохраняются
      })
  },
})

export const { toggleLike, clearCurrentUser } = usersSlice.actions
export default usersSlice.reducer