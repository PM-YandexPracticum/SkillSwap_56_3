import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers, fetchUserById } from '@/api/users'
import type { UserCard, UsersResponse } from '@/shared/types'
import type { UsersState } from './types'
import { FAKE_DELAY } from '@/shared/lib/constants'


export const loadUsers = createAsyncThunk<
  UsersResponse,
  void,
  { state: { users: UsersState }; rejectValue: string }
>(
  'users/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))
      const response = (await fetchUsers()) as unknown as UsersResponse
      return response
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не удалось загрузить пользователей'
      return rejectWithValue(message)
    }
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState()
      return !users.isLoading
    },
  }
)

export const loadUserById = createAsyncThunk<
  UserCard,
  string,
  { state: { users: UsersState }; rejectValue: string }
>(
  'users/loadUserById',
  async (id, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))
      const user = (await fetchUserById(id)) as unknown as UserCard | undefined
      if (!user) {
        return rejectWithValue(`Пользователь ${id} не найден`)
      }
      return user
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не удалось загрузить пользователя'
      return rejectWithValue(message)
    }
  },
  {
    condition: (id, { getState }) => {
      const { users } = getState()
      if (users.isLoadingCurrent && users.currentUser?.id === id) return false
      if (users.currentUser?.id === id) return false
      return true
    },
  }
)